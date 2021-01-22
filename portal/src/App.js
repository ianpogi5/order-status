import { useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import "./scss/index.scss";

const { REACT_APP_WS_ENDPOINT } = process.env;

const App = () => {
  const [client, setClient] = useState(null);
  const [status, setStatus] = useState("disconnected");

  const onMessage = (message) => {
    console.log(message);
  };

  const connect = () => {
    const cl = new W3CWebSocket(REACT_APP_WS_ENDPOINT);
    cl.onopen = () => {
      setStatus("connected");
    };
    cl.onmessage = (message) => onMessage;
    setClient(cl);
  };

  const disconnect = () => {
    client.close();
    setStatus("disconnected");
  };

  return (
    <div className="App container">
      <header className="App-header">
        <h1>Portal</h1>
      </header>
      <main>
        <div className="row mb-2">
          <button
            type="button"
            className="btn btn-primary mr-1"
            onClick={connect}
          >
            Connect
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={disconnect}
          >
            Disconnect
          </button>
        </div>
        <div className="row">
          <h3 className="h5">
            Status:{" "}
            <span
              className={
                status === "connected" ? "text-success" : "text-danger"
              }
            >
              {status}
            </span>
          </h3>
        </div>
      </main>
    </div>
  );
};

export default App;
