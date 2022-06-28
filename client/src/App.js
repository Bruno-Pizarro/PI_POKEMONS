import React from "react";
import Home from "./components/Home";
import { Route } from "react-router-dom";
import CreatePokemon from "./components/CreatePokemon";
import PokemonDetail from "./components/PokemonDetail";
import Nav from "./components/Nav";
import "./App.css";
import Welcome from "./components/Welcome";

function App() {
  return (
    <div className="App">
      <Route path={"/:path"}>
        <Nav />
        <Route exact path={"/home"} component={Home} />
        <Route exact path={"/home/pokemon/:id"} component={PokemonDetail} />
        <Route exact path={"/create"} component={CreatePokemon} />
      </Route>
      <Route exact path={"/"} component={Welcome} />
    </div>
  );
}

export default App;
