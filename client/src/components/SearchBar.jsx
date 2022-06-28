import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearError, filterName, noFilter } from "../redux/actions";
import s from "../stylesheets/SearchBar.module.css";

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
    <form className={s.searchCont} onSubmit={(e) => filterByName(e)}>
      <input
        className={s.input}
        type="text"
        value={filter}
        placeholder="Search..."
        onChange={(e) => handleChange(e)}
      />
      <button
        type="submit"
        className={`${s.btn} ${filter !== "" ? s.btnsearch : null}`}
      >
        {filter === "" ? <span>↺</span> : <span>🔎︎</span>}
      </button>
    </form>
  );
}
