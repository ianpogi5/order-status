import { useState } from "react";
import "./scss/index.scss";

const App = () => {
  const [message, setMessage] = useState("");

  const send = () => {
    console.log(message);
  };

  return (
    <div className="App container">
      <header className="App-header">
        <h1>Market</h1>
      </header>
      <main>
        <form>
          <div className="form-group">
            <label for="message">Message</label>
            <textarea
              className="form-control"
              id="message"
              rows="3"
              onChange={(e) => setMessage(e.target.value)}
            >
              {message}
            </textarea>
          </div>
          <button type="button" className="btn btn-primary" onClick={send}>
            Send
          </button>
        </form>
      </main>
    </div>
  );
};

export default App;
