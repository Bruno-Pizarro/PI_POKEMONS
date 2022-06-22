import React from "react";
import { useDispatch } from "react-redux";
import { sortBy } from "../redux/actions";

export default function OrderBy() {
  const dispatch = useDispatch();
  function orderBy(e) {
    e.preventDefault();
    if (e.target.value !== "all") {
      dispatch(sortBy(e.target.value));
    }
  }
  return (
    <div>
      <form onSubmit={(e) => orderBy(e)}>
        <select id="browsers" onChange={(e) => orderBy(e)}>
          <option value="all">Select order</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="a-h-t-l">Attack(highest to lowest)</option>
          <option value="a-l-t-h">Attack(lowest to highest)</option>
        </select>
      </form>
    </div>
  );
}
