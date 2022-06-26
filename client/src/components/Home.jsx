import React from "react";
import Cards from "./Cards";
import AllFilters from "./AllFilters";
import s from "../stylesheets/Home.module.css";

export default function Home() {
  return (
    <div className={s.homeCont}>
      <div className={s.divFilters}>
        <AllFilters />
      </div>
      <div className={s.divCards}>
        <Cards />
      </div>
    </div>
  );
}
