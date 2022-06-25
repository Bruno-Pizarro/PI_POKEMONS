import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTypes, applyFilters } from "../redux/actions";

export default function AllFilters() {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    from: "all",
    types: "all",
    order: "all",
  });
  const types = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();
    setFilters({ ...filters, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(applyFilters(filters));
    setFilters({
      from: "all",
      types: "all",
      order: "all",
    });
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <select
          id="from"
          value={filters.from}
          onChange={(e) => handleChange(e)}
        >
          <option value="all">Select from</option>
          <option value="api">Original</option>
          <option value="db">Created</option>
        </select>

        <select
          id="types"
          value={filters.types}
          onChange={(e) => handleChange(e)}
        >
          <option value="all">Select Type</option>
          {types &&
            types.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
              </option>
            ))}
        </select>

        <select
          id="order"
          value={filters.order}
          onChange={(e) => handleChange(e)}
        >
          <option value="all">Select order</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="a-h-t-l">Attack(highest to lowest)</option>
          <option value="a-l-t-h">Attack(lowest to highest)</option>
        </select>

        <button type="submit">
          {" "}
          {filters.order !== "all" ||
          filters.from !== "all" ||
          filters.types !== "all"
            ? "Apply Filter"
            : "Refresh"}
        </button>
      </form>
    </div>
  );
}
