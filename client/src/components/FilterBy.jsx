import React from "react";
import { useDispatch } from "react-redux";
import {
  clearFilterType,
  getAllPokemons,
  getApiPokemons,
  getDBPokemons,
} from "../redux/actions";

export default function FilterBy() {
  const dispatch = useDispatch();
  function filterBy(e) {
    e.preventDefault();
    if (e.target.value === "all") {
      dispatch(getAllPokemons());
      dispatch(clearFilterType());
    } else if (e.target.value === "api") {
      dispatch(getApiPokemons());
      dispatch(clearFilterType());
    } else if (e.target.value === "db") {
      dispatch(getDBPokemons());
      dispatch(clearFilterType());
    }
  }
  return (
    <div>
      <form onSubmit={(e) => filterBy(e)}>
        <select id="browsers" onChange={(e) => filterBy(e)}>
          <option value="all">Select filter</option>
          <option value="api">Original</option>
          <option value="db">Created</option>
        </select>
      </form>
    </div>
  );
}
