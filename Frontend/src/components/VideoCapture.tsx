import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const VideoCapture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Constraints for video capture with a frame rate of 10 fps
  const constraints: MediaStreamConstraints = {
    video: { width: 1280, height: 720, frameRate: { exact: 10, ideal: 10, max: 30 } },
    audio: false,
  };

  const serverEndpoint = 'YOUR_SERVER_ENDPOINT'; // Replace with your server's WebSocket endpoint

  useEffect(() => {
    const socket = io(serverEndpoint);

    // Function to handle errors
    const handleGetUserMediaError = (error: Error) => {
      console.error('getUserMedia error:', error);
    };

    // Access the user's camera and set it as the video source
    const startVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          // Send video frames to the server
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              console.log(event.data)
              socket.emit('video-frame', event.data);
            }
          };
          mediaRecorder.start();
        }
      } catch (error) {
        handleGetUserMediaError(error as Error);
      }
    };

    // Start the video stream when the component mounts
    startVideoStream();

    // Clean up the stream and socket connection when the component unmounts
    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach((track) => {
            track.stop();
          });
        }
      }
      socket.disconnect();
    };
  }, [constraints, serverEndpoint]);

  return (
    <div>
      {/* Video preview */}
      <video autoPlay playsInline ref={videoRef} />
    </div>
  );
};

export default VideoCapture;
