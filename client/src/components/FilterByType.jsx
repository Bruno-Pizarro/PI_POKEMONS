import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, getAllTypes } from "../redux/actions";

export default function FilterByType() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);
  function filterBy(e) {
    e.preventDefault();
    if (e.target.value === "all") {
      dispatch(getAllPokemons());
    } else {
    }
  }
  return (
    <div>
      <form onSubmit={(e) => filterBy(e)}>
        <select id="browsers" onChange={(e) => filterBy(e)}>
          <option value="all">Select Type</option>
          {types &&
            types.map((t) => (
              <option value={t.name}>
                {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
              </option>
            ))}
        </select>
      </form>
    </div>
  );
}
