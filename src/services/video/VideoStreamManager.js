export class VideoStreamManager {
  constructor(videoElement) {
    this.videoElement = videoElement;
    this.stream = null;
  }

  async setupStream(camera) {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ 
        video: { deviceId: camera.deviceId ? { exact: camera.deviceId } : undefined }
      });
      this.videoElement.srcObject = this.stream;
      return this.stream;
    } catch (error) {
      console.error('Error getting media stream:', error);
      throw error;
    }
  }

  async startPlayback() {
    try {
      await this.videoElement.play();
      console.log('Video started playing');
    } catch (error) {
      console.error('Error playing video:', error);
      throw error;
    }
  }

  stopStream() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  cleanup() {
    this.stopStream();
    if (this.videoElement) {
      this.videoElement.srcObject = null;
    }
  }
} 