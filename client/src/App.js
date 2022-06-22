import React from "react";
import "./App.css";
import Home from "./components/Home";
import { Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <h1>Henry Pokemon</h1>
      <Route exact path={"/home"} component={Home} />
    </div>
  );
}

export default App;
