import React, { useEffect, useRef, useState } from 'react';
import ScanArea from './components/ScanArea';
import { v4 as uuidv4 } from 'uuid';
import useInternetStatus from './hooks/useInternetStatus';
import ErrorNotification from './components/ErrorNotification';
import { VideoRecorder } from './services/video/VideoRecorder';
import { VideoStreamManager } from './services/video/VideoStreamManager';
import { ProgressManager } from './services/video/ProgressManager';
import { Client } from 'nervoscan-js-sdk'
const STREAM_DURATION = 20000; // 30 seconds

function VideoStream({ jobID, setJobID, scanButtonDisable, setScanButtonDisable, scanVisibility, setScanVisibility, setSpinnerVisibility }) {
  const useStreaming = useRef(true);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const localVideoRef = useRef(null);
  const progressRef = useRef(null);
  const isOnline = useInternetStatus();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Initialize service instances
  const videoRecorderRef = useRef(new VideoRecorder());
  const videoStreamManagerRef = useRef(null);
  const progressManagerRef = useRef(null);
  const nervoscanClient = useRef(null);

  useEffect(() => {
    nervoscanClient.current = Client.getInstance();
    nervoscanClient.current.initialize('chathuranga', '123');
    nervoscanClient.current.setOnDisconnection(() => stopStreaming());

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
      const stream = await videoStreamManagerRef.current?.setupStream(camera);
      if (stream) {
        videoRecorderRef.current.setStream(stream);
        nervoscanClient.current.initializeStreaming(stream, localVideoRef.current);
      }
    } catch (error) {
      console.error('Error setting up stream:', error);
    }
  };

  const stopStreaming = async () => {
    progressManagerRef.current?.stopProgressTracking();
    await progressManagerRef.current?.accelerateProgress();
    progressManagerRef.current?.resetProgress();
    setScanVisibility(false);
    setSpinnerVisibility(true);
    if (!useStreaming.current) {
      await videoRecorderRef.current?.stopRecording();
    }
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
      if (useStreaming.current) {
        const apiKey = await nervoscanClient.current.startStreaming();
        setJobID(apiKey);
      } else {
        await videoStreamManagerRef.current?.startPlayback();
        videoRecorderRef.current?.startRecording();
      }
      setScanButtonDisable(true);
    } catch (error) {
      console.error('Error starting video stream:', error);
    }
  };

  const cleanupResources = () => {
    videoStreamManagerRef.current?.cleanup();
    videoRecorderRef.current?.cleanup();
  };

  const onProgressComplete = async () => {
    if (useStreaming.current) {
      return;
    }
    console.log('Progress complete');
    await stopStreaming();
    console.log('Attempting to get blob...');
    const videoBlob = videoRecorderRef.current?.getRecordedBlob();
    console.log('Blob:', videoBlob);
    const apiKey = await nervoscanClient.current.uploadVideo(videoBlob);
    console.log(apiKey);
    setJobID(apiKey);
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
