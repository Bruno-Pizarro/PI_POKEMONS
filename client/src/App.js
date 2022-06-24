import React from "react";
import "./App.css";
import Home from "./components/Home";
import { Route } from "react-router-dom";
import CreatePokemon from "./components/CreatePokemon";
function App() {
  return (
    <div className="App">
      <h1>Henry Pokemon</h1>
      <Route exact path={"/home"} component={Home} />
      <Route exact path={"/create"} component={CreatePokemon} />
    </div>
  );
}

export default App;
