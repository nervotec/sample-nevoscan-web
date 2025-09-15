import React, { useEffect, useRef, useState } from 'react';
import ScanArea from './components/ScanArea';
import { v4 as uuidv4 } from 'uuid';
import useInternetStatus from './hooks/useInternetStatus';
import ErrorNotification from './components/ErrorNotification';
import { VideoStreamManager } from './services/video/VideoStreamManager';
import { ProgressManager } from './services/video/ProgressManager';
import { Client } from 'nervoscan-js-sdk'
const STREAM_DURATION = 20000; // 30 seconds

function VideoStream({ jobID, setJobID, scanButtonDisable, setScanButtonDisable, scanVisibility, setScanVisibility, setSpinnerVisibility }) {
  const [selectedCamera, setSelectedCamera] = useState(null);
  const localVideoRef = useRef(null);
  const progressRef = useRef(null);
  const isOnline = useInternetStatus();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const stream = useRef(null);

  // Initialize service instances
  const videoStreamManagerRef = useRef(null);
  const progressManagerRef = useRef(null);
  const nervoscanClient = useRef(null);

  useEffect(() => {
    nervoscanClient.current = Client.getInstance();
    nervoscanClient.current.initialize({ licenseKey: '3a84ab78-3e9c-4b06-a464-e5422c1bb990', serverType: 'server', useRgb: true });
    nervoscanClient.current.setOnDisconnection(() => stopStreaming());
    nervoscanClient.current.setOnAlignmentStatus?.(() => {
      // Optionally handle alignment feedback here without UI changes
    });

    if (localVideoRef.current) {
      videoStreamManagerRef.current = new VideoStreamManager(localVideoRef.current);
    }
    if (progressRef.current) {
      progressManagerRef.current = new ProgressManager(progressRef.current, STREAM_DURATION, onProgressComplete);
    }
  }, []);

  useEffect(() => {
    console.log('Internet connection status:', isOnline);
    if (!isOnline) {
      progressManagerRef.current?.stopProgressTracking();
      setIsDialogOpen(true);
    }
  }, [isOnline]);

  useEffect(() => {
    if (!selectedCamera) return;
    setupLocalMediaStream(selectedCamera);
    return () => {
      cleanupResources();
    };
  }, [selectedCamera]);

  const setupLocalMediaStream = async (camera) => {
    try {
      stream.current = await videoStreamManagerRef.current?.setupStream(camera);
      if (stream.current) {
        await nervoscanClient.current.initializeStreaming(
          stream.current,
          localVideoRef.current,
          { targetFPS: 30, enableFrameValidation: true, enableQualityControl: true }
        );
        nervoscanClient.current.startFaceDetection?.();
      }
    } catch (error) {
      console.error('Error setting up stream:', error);
    }
  };

  const stopStreaming = async () => {
    try {
      nervoscanClient.current?.stopFaceDetection?.();
      await nervoscanClient.current?.stopStreaming?.();
    } catch (e) {
      console.error('Error stopping nervoscan client:', e);
    }
    progressManagerRef.current?.stopProgressTracking();
    await progressManagerRef.current?.accelerateProgress();
    progressManagerRef.current?.resetProgress();
    setScanVisibility(false);
  };

  const handleButtonClick = async () => {
    try {
      startVideoStream();
      progressManagerRef.current?.startProgressTracking();
    } catch (error) {
      console.error('Error starting video processing:', error);
    }
  };

  const startVideoStream = async () => {
    try {
      const apiKey = await nervoscanClient.current.startStreaming();
      setJobID(apiKey);
      setScanButtonDisable(true);
    } catch (error) {
      console.error('Error starting video stream:', error);
    }
  };

  const cleanupResources = () => {
    videoStreamManagerRef.current?.cleanup();
  };

  const onProgressComplete = async () => {
    try {
      await stopStreaming();
    } catch (e) {
      console.error('Error on progress complete stop:', e);
    }
  };

  return (
    <div>
      <ScanArea
        localVideoRef={localVideoRef}
        progressRef={progressRef}
        handleButtonClick={handleButtonClick}
        onSelectCamera={setSelectedCamera}
        scanButtonDisable={scanButtonDisable}
        scanVisibility={scanVisibility}
      />
      <ErrorNotification
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        message="Internet connection is lost. Please restart the scan after connecting to the internet."
      />
    </div>
  );
}

export default VideoStream;
