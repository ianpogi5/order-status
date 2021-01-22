import { useState } from "react";
import "./scss/index.scss";

const App = () => {
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [response, setResponse] = useState("");

  const send = async () => {
    setResponse("");
    const rawResponse = await fetch(process.env.REACT_APP_API_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, message }),
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
            <label htmlFor="message">Message</label>
            <textarea
              className="form-control"
              id="message"
              rows="3"
              onChange={(e) => setMessage(e.target.value)}
              defaultValue={message}
            ></textarea>
          </div>
          <button type="button" className="btn btn-primary" onClick={send}>
            Send
          </button>
        </form>
        <p>Response: {response}</p>
      </main>
    </div>
  );
};

export default App;
