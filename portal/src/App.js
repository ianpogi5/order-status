import { useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const App = () => {
  const [client, setClient] = useState(null);

  const onMessage = (message) => {
    console.log(message);
  };

  const connect = () => {
    const cl = new W3CWebSocket("ws://localhost:9000");
    cl.onopen = () => {
      console.log("WebSocket client Connected");
    };
    cl.onmessage = (message) => onMessage;
    setClient(cl);
  };
  useEffect(() => {}, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Portal</h1>
      </header>
      <main>
        <button type="button" onClick={connect}>
          Connect
        </button>
      </main>
    </div>
  );
};

export default App;
