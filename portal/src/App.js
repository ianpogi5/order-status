import { useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import "./scss/index.scss";

const { REACT_APP_WS_ENDPOINT } = process.env;

const App = () => {
  const [client, setClient] = useState(null);
  const [status, setStatus] = useState("disconnected");
  const [messages, setMessages] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [outletId, setOutletId] = useState("");

  const connect = () => {
    const cl = new W3CWebSocket(
      `${REACT_APP_WS_ENDPOINT}?companyId=${companyId}&outletId=${outletId}`
    );

    cl.onopen = () => {
      setStatus("connected");
    };

    cl.onmessage = (message) => {
      console.log(message);
      setMessages((m) => `${m}<p>${message.data}</p>`);
    };

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
          <form>
            <div className="form-group">
              <label htmlFor="companyId">Company ID</label>
              <input
                type="text"
                className="form-control"
                id="companyId"
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="outletId">Outlet ID</label>
              <input
                type="text"
                className="form-control"
                id="outletId"
                value={outletId}
                onChange={(e) => setOutletId(e.target.value)}
              />
            </div>
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
          </form>
        </div>
        <div className="row mb-4">
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
        <div
          className="row"
          dangerouslySetInnerHTML={{ __html: messages }}
        ></div>
      </main>
    </div>
  );
};

export default App;
