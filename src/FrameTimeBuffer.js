class FrameTimeBuffer {
    constructor() {
      this.queue = [];
    }
  
    // Add a frame and its timestamp to the queue
    enqueue(frameData, timestamp) {
      this.queue.push({ frameData, timestamp });
    }
  
    // Remove and return the oldest frame and its timestamp from the queue
    dequeue() {
      if (this.isEmpty()) {
        return null;
      }
      return this.queue.shift();
    }
  
    // Check if the queue is empty
    isEmpty() {
      return this.queue.length === 0;
    }
  
    // Get the current size of the queue
    size() {
      return this.queue.length;
    }

    flush() {
        this.queue = [];
    }
  }
  
  export default FrameTimeBuffer;
  