import React from "react";
import Cards from "./Cards";
import SearchBar from "./SearchBar";
import Paginated from "./Paginated";
import AllFilters from "./AllFilters";

export default function Home() {
  return (
    <div>
      <h1>Hola!</h1>
      <AllFilters />
      <SearchBar />
      <Paginated />
      <Cards />
    </div>
  );
}
