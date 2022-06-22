import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterName, clearFilter } from "../redux/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const filtered = useSelector((state) => state.filtered);
  function filterByName(e) {
    e.preventDefault();
    if (filter === "") {
      return dispatch(clearFilter());
    }
    dispatch(filterName(filter));
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
          {filtered.length > 0 || filter === "" ? (
            <span>REFRESH</span>
          ) : (
            <span>SEARCH</span>
          )}
        </button>
      </form>
    </div>
  );
}
