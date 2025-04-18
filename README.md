![nervotec.png](nervotec.png)

# NervoScan: Contactless Vital Sign Monitoring Web Application

## Overview

NervoScan is a cutting-edge web application that enables contactless monitoring of vital signs using advanced computer vision technology. This innovative solution provides real-time tracking of heart rate, respiratory rate, and other vital parameters without physical contact with the subject.

## Features

- Real-time vital sign monitoring through webcam
- Heart rate detection using facial blood flow analysis
- Respiratory rate measurement through chest movement tracking
- Blood pressure estimation through facial features and pulse transit time
- Blood glucose level approximation using machine learning algorithms
- Stress level assessment through heart rate variability analysis

## Technology Stack

Frontend:

- React.js
- Vite for fast development and building
- Tailwind CSS for styling

## Installation

```bash
# Clone the repository
git clone https://github.com/nervotec/sample-nevoscan-web.git

# Navigate to project directory
cd sample-nevoscan-web

# Install dependencies
npm install

# Start the development server
npm run dev

```

## Usage

1. Launch the application in your web browser
2. Grant camera permissions when prompted
3. Position yourself in front of the camera
4. Press the Scan button
5. Wait for the video to record (approximately 15 seconds)
6. View your vital signs on the dashboard

## Requirements

- Modern web browser (chrome/safari)
- Webcam with minimum 720p resolution
- Node.js v14 or higher
- Stable internet connection


📸 Frame Capture & Backend Upload – Developer Note
This section outlines the core classes and functions responsible for:

Capturing video frames

Recording them

Sending the recorded video to the backend server

1. VideoStreamManager
File: services/video/VideoStreamManager.js
Role: Initializes and controls the webcam stream.

Key Methods:

setupStream(camera): Requests camera access and attaches the stream to the <video> element.

startPlayback(): Starts playing the local stream.

stopStream() / cleanup(): Stops and releases the stream.

2. VideoRecorder
File: services/video/VideoRecorder.js
Role: Records the active webcam stream and accumulates video data chunks.

Key Methods:

setStream(stream): Assigns the webcam stream for recording.

startRecording(): Starts recording using MediaRecorder.

stopRecording(): Stops the recording and finalizes the data.

getRecordedBlob(): Returns the final recorded video as a Blob.

3. uploadVideo
File: services/backendService.js
Role: Handles uploading the recorded video to the backend.

Function Signature:

js
Copy
Edit
uploadVideo(videoBlob, setJobID)
Behavior:
Takes the Blob from VideoRecorder, sends it via a POST request, and updates jobID.
