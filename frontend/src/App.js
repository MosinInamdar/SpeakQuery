import React from "react";
import QueryForm from "./components/QueryForm.js";
import "./styles/App.css";

function App() {
  return (
    <div className="app-container">
      <div className="chatbot-body">
        <QueryForm />
      </div>
    </div>
  );
}

export default App;
