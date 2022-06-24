import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFilterType, filterByType, getAllTypes } from "../redux/actions";

export default function FilterByType() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("all");
  const types = useSelector((state) => state.types);
  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);
  function filterBy(e) {
    e.preventDefault();
    setFilter(e.target.value);
    if (e.target.value === "all") {
      dispatch(clearFilterType());
    } else {
      dispatch(filterByType(e.target.value));
    }
  }
  return (
    <div>
      <form onSubmit={(e) => filterBy(e)}>
        <select id="types" value={filter} onChange={(e) => filterBy(e)}>
          <option value="all">Select Type</option>
          {types &&
            types.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
              </option>
            ))}
        </select>
      </form>
    </div>
  );
}
