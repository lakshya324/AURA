import { styles } from "../styles";
import Dictaphone from "./Dictaphone";
import VideoCapture from "./VideoCapture";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useEffect, useState } from "react"; // Import React hooks for managing state and side effects


const SecondPage = () => {
  const { unityProvider, isLoaded, loadingProgression, sendMessage } = useUnityContext({
    codeUrl: "Build/wasm.gz",
    frameworkUrl: "Build/framework.js.gz",
    dataUrl: "Build/data.gz",
    loaderUrl: "Build/loader.js",
  });

  // State to store WebSocket messages
  const [websocketMessage, setWebsocketMessage] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8888');
if (isLoaded){
    // Event handler for when the WebSocket connection is opened
    socket.onopen = () => {
      console.log('WebSocket connection opened.');
    };

    // Event handler for receiving messages from the WebSocket
    socket.onmessage = (event) => {
      const receivedMessage = event.data;
      // Update the state with the received message
      setWebsocketMessage(receivedMessage);
      console.log('sending to unity')
      SendAnswerToUnity(receivedMessage);
    };

    // Event handler for WebSocket errors
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Event handler for WebSocket closure
    socket.onclose = () => {
      console.log('WebSocket connection closed.');
    };
  }
    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  
  }, [isLoaded]); // Empty dependency array ensures this effect runs once on component mount

  // Function to send an answer to Unity
  function SendAnswerToUnity(ans) {
    sendMessage('Cube', 'GetMessage', ans);
  }

  return (
    <section id="secondpage" className={`relative z-0 bg-primary`}>
      <div className="unity-container unitypadding ">
        <Unity unityProvider={unityProvider} style={{width:"90vw" , height:"80vh",margin:'auto'}}/>
      </div>

      <div>
        <Dictaphone />
        {/* <VideoCapture/>  */}
      </div>

    </section>
  );
};

export default SecondPage;
