import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTypes, applyFilters, sortBy } from "../redux/actions";
import s from "../stylesheets/AllFilters.module.css";

export default function AllFilters({ open, home }) {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    from: "all",
    types: "all",
    order: "all",
  });
  const [order, setOrder] = useState("all");
  const types = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();
    setFilters({ ...filters, [e.target.id]: e.target.value });
  }
  function handleChangeSort(e) {
    e.preventDefault();
    setOrder(e.target.value);
    dispatch(sortBy(e.target.value));
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(applyFilters(filters));
    setFilters({
      from: "all",
      types: "all",
    });
    setOrder("all");
  }

  return (
    <div className={`${s.contfilter} ${home ? s.home : null}`}>
      <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
        <p>Filters</p>
        <select
          className={s.selects}
          id="from"
          value={filters.from}
          onChange={(e) => handleChange(e)}
        >
          <option className={s.option} value="all">
            Select from
          </option>
          <option className={s.option} value="api">
            Original
          </option>
          <option className={s.option} value="db">
            Created
          </option>
        </select>
        <select
          className={s.selects}
          id="types"
          value={filters.types}
          onChange={(e) => handleChange(e)}
        >
          <option className={s.option} value="all">
            Select Type
          </option>
          {types &&
            types.map((t) => (
              <option className={s.option} key={t.id} value={t.name}>
                {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
              </option>
            ))}
        </select>

        <button className={s.applyBtn} type="submit">
          {" "}
          {filters.from !== "all" || filters.types !== "all"
            ? "Apply Filter"
            : "Refresh"}
        </button>
        <p>Order</p>
        <select
          className={s.selects}
          id="order"
          value={order}
          onChange={(e) => handleChangeSort(e)}
        >
          <option value="all" className={s.option}>
            No order
          </option>
          <option value="a-z" className={s.option}>
            A-Z
          </option>
          <option value="z-a" className={s.option}>
            Z-A
          </option>
          <option value="a-h-t-l" className={s.option}>
            Attack(highest to lowest)
          </option>
          <option value="a-l-t-h" className={s.option}>
            Attack(lowest to highest)
          </option>
        </select>
      </form>
    </div>
  );
}
