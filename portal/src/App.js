import { useState } from "react";
import WS from "./ws";
import "./scss/index.scss";

const { REACT_APP_WS_ENDPOINT } = process.env;

const App = () => {
  const [client, setClient] = useState(null);
  const [status, setStatus] = useState("disconnected");
  const [orders, setOrders] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [outletId, setOutletId] = useState("");

  const onConnected = () => {
    setStatus("connected");
  };

  const onOrderChange = (order) => {
    console.log(order);
    setOrders((m) => `${m}<p>${order.data}</p>`);
  };

  const onDisconnect = () => {
    setStatus("disconnected");
  };

  const connect = () => {
    const cl = new WS({
      companyId,
      outletId,
      wsEndpoint: REACT_APP_WS_ENDPOINT,
      onConnected,
      onOrderChange,
      onDisconnect,
    });

    setClient(cl);
  };

  const disconnect = () => {
    client.disconnect();
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
        <div className="row" dangerouslySetInnerHTML={{ __html: orders }}></div>
      </main>
    </div>
  );
};

export default App;
