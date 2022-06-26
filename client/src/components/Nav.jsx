import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import s from "../stylesheets/Nav.module.css";

export default function Nav() {
  return (
    <nav className={s.nav}>
      <ul>
        <NavLink
          activeClassName={s.active}
          className={s.navlink}
          exact
          to={"/home"}
        >
          <li>Home</li>
        </NavLink>
        <NavLink
          activeClassName={s.active}
          className={s.navlink}
          exact
          to={"/create"}
        >
          <li>Create a Pokemon</li>
        </NavLink>
      </ul>

      <SearchBar />
    </nav>
  );
}
