import React, { useState } from "react";
import TerminalComponent from "./components/Terminal/Terminal";
import './App.css';

function App() {
  const [sessionStarted, setSessionStarted] = useState(false);
  const [credentials, setCredentials] = useState({
    host: '',
    port: 22,
    username: '',
    password: ''
  });

  const handleStart = () => {
    if (!credentials.host || !credentials.username || !credentials.password) {
      alert("Please fill in all fields!");
      return;
    }
    console.log(credentials);
    setSessionStarted(true);
  };

  return (
    <div className="app-container">
      {sessionStarted ? (
        <TerminalComponent {...credentials} onClose={() => setSessionStarted(false)} />
      ) : (
        <div className="box">
          <h2>SSH Terminal Login</h2>
          <input
            placeholder="Host"
            onChange={e => setCredentials(c => ({ ...c, host: e.target.value }))}
          />
          <input
            placeholder="Port"
            type="number"
            defaultValue={22}
            onChange={e => setCredentials(c => ({ ...c, port: e.target.value }))}
          />
          <input
            placeholder="Username"
            onChange={e => setCredentials(c => ({ ...c, username: e.target.value }))}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={e => setCredentials(c => ({ ...c, password: e.target.value }))}
          />
          <button onClick={handleStart}>Start Session</button>
        </div>
      )}
    </div>
  );
}

export default App;