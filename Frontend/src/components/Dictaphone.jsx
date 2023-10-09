import "regenerator-runtime";
import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Dictaphone = () => {
  const {
    finalTranscript,
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [isListening, setIsListening] = useState(false);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Create a WebSocket connection when the component mounts
    const newWs = new WebSocket("ws://localhost:8888"); // Replace with your WebSocket server's URL.

    newWs.onopen = () => {
      console.log("WebSocket connected");
      setWs(newWs);
    };

    newWs.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      // Clean up the WebSocket connection when the component unmounts.
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const handleStartListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-IN",
    });
  };

  const handleStopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    
    if (ws && finalTranscript) {
      // Send finalTranscript to the WebSocket server when the user clicks "Stop."
      ws.send(finalTranscript);

      // Clear the final transcript after sending it.
      resetTranscript();
    }
  };

  const handleResetTranscript = () => {
    resetTranscript();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <div className="btnts">
        <button
          className="ts"
          onClick={handleStartListening}
          disabled={isListening}
        >
          Start
        </button>
        <span className="button-gap"></span>
        <button
          className="ts"
          onClick={handleStopListening}
          disabled={!isListening}
        >
          Stop
        </button>
        <span className="button-gap"></span>
        <button className="ts" onClick={handleResetTranscript}>
          Reset
        </button>
      </div>
      <div className="flex microphonets">
        <p className="micro ">Microphone: {isListening ? "on" : "off"}</p>
        <p className="micro ">Real-time Transcript: {transcript}</p>
        <p className="micro ">Final Transcript: {finalTranscript}</p>
      </div>
    </div>
  );
};

export default Dictaphone;