import { useState } from "react";
import "./scss/index.scss";

const App = () => {
  const [order, setOrder] = useState("");
  const [id, setId] = useState("");
  const [status, setStatus] = useState("Submitted");
  const [response, setResponse] = useState("");

  const send = async () => {
    setResponse("");
    const rawResponse = await fetch(process.env.REACT_APP_API_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status, order }),
    });
    const content = await rawResponse.json();
    setResponse(content.message);
  };

  return (
    <div className="App container">
      <header className="App-header">
        <h1>Market</h1>
      </header>
      <main>
        <form>
          <div className="form-group">
            <label htmlFor="ID">Order ID</label>
            <input
              type="text"
              className="form-control"
              id="ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              className="custom-select"
              defaultValue={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Submitted">Submitted</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Ready">Ready</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="order">Order</label>
            <textarea
              className="form-control"
              id="order"
              rows="3"
              onChange={(e) => setOrder(e.target.value)}
              defaultValue={order}
            ></textarea>
          </div>
          <button type="button" className="btn btn-primary" onClick={send}>
            Send
          </button>
        </form>
        <p>Server Response: {response}</p>
      </main>
    </div>
  );
};

export default App;
