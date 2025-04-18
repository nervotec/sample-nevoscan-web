export class VideoRecorder {
    constructor() {
      this.mediaRecorder = null;
      this.recordedChunks = [];
      this.stream = null;
    }
  
    setStream(stream) {
      this.stream = stream;
    }
  
    startRecording() {
      if (!this.stream) {
        throw new Error('No video stream available');
      }
  
      this.recordedChunks = [];
      const options = { mimeType: 'video/webm;codecs=vp9' };
      
      try {
        this.mediaRecorder = new MediaRecorder(this.stream, options);
  
        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.recordedChunks.push(event.data);
          } else {
            console.warn('Empty data chunk');
          }
        };
  
        this.mediaRecorder.start();
        console.log('Recording started');
      } catch (error) {
        console.error('Error starting recording:', error);
        throw error;
      }
    }
  
    stopRecording() {
        if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
          return Promise.resolve();
        }
      
        return new Promise((resolve) => {
      
          const handleStop = () => {
            cleanup();
            resolve();
          };
      
          const cleanup = () => {
            this.mediaRecorder.removeEventListener('stop', handleStop);
          };
          this.mediaRecorder.addEventListener('stop', handleStop);
      
          this.mediaRecorder.stop();
          console.log('Recording stopped');
        });
      }
      
  
    getRecordedBlob() {
      console.log('Chunks count:', this.recordedChunks.length); // ✅ add this
      if (this.recordedChunks.length === 0) {
        throw new Error('No recorded chunks available');
      }
      return new Blob(this.recordedChunks, { type: 'video/webm' });
    }
  
    cleanup() {
      this.stopRecording();
      this.recordedChunks = [];
      this.mediaRecorder = null;
    }
  }
  