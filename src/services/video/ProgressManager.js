export class ProgressManager {
  constructor(progressElement, duration, onComplete) {
    this.progressElement = progressElement;
    this.duration = duration;
    this.intervalId = null;
    this.timeoutId = null;
    this.onComplete = onComplete;
  }

  startProgressTracking() {
    const startTime = Date.now();
    this.intervalId = setInterval(() => this.updateProgress(startTime), 100);
    this.timeoutId = setTimeout(() => this.stopProgressTracking(), this.duration);
  }

  updateProgress(startTime) {
    const elapsed = Date.now() - startTime;
    const progress = Math.ceil((elapsed / this.duration) * 100);
    if (this.progressElement) {
      this.progressElement.value = Math.min(progress, 100);
    }
    if (progress >= 100) {
      this.onComplete();
    }
  }

  async accelerateProgress(duration = 2500) {
    return new Promise((resolve) => {
      const startProgress = this.progressElement ? this.progressElement.value : 0;
      const startTime = Date.now();
  
      const accelerate = () => {
        const elapsedTime = Date.now() - startTime;
        const newProgress = startProgress + ((100 - startProgress) * (elapsedTime / duration));
  
        if (this.progressElement) {
          this.progressElement.value = Math.min(newProgress, 100);
        }
  
        if (newProgress >= 100) {
          clearInterval(this.intervalId);
          this.intervalId = null;
          resolve(); 
        }
      };
  
      this.intervalId = setInterval(accelerate, 10); 
    });
  }

  stopProgressTracking() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  resetProgress() {
    if (this.progressElement) {
      this.progressElement.value = 0;
    }
  }

  cleanup() {
    this.stopProgressTracking();
    this.resetProgress();
  }
} 