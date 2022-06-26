import React from "react";
import Home from "./components/Home";
import { Route } from "react-router-dom";
import CreatePokemon from "./components/CreatePokemon";
import PokemonDetail from "./components/PokemonDetail";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Route path={"/"} />
      <Route path={"/:path"}>
        <Nav />
        <Route exact path={"/home"} component={Home} />
        <Route exact path={"/home/pokemon/:id"} component={PokemonDetail} />
        <Route exact path={"/create"} component={CreatePokemon} />
      </Route>
    </div>
  );
}

export default App;
