import React from "react";
import Cards from "./Cards";
import SearchBar from "./SearchBar";
import FilterBy from "./FilterBy";
import FilterByType from "./FilterByType";
import OrderBy from "./OrderBy";
import Paginated from "./Paginated";

export default function Home() {
  return (
    <div>
      <h1>Hola!</h1>
      <FilterBy />
      <FilterByType />
      <OrderBy />
      <SearchBar />
      <Paginated />
      <Cards />
    </div>
  );
}
