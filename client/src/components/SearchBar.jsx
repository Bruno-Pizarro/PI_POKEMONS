import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearError, filterName, noFilter } from "../redux/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  function filterByName(e) {
    e.preventDefault();
    if (filter === "") {
      dispatch(clearError());
      return dispatch(noFilter("search"));
    }
    dispatch(filterName(filter.toLowerCase()));
    setFilter("");
  }
  function handleChange(e) {
    e.preventDefault();
    setFilter(e.target.value);
  }
  return (
    <div>
      <form onSubmit={(e) => filterByName(e)}>
        <input
          type="text"
          value={filter}
          placeholder="Search..."
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">
          {filter === "" ? <span>REFRESH</span> : <span>SEARCH</span>}
        </button>
      </form>
    </div>
  );
}
