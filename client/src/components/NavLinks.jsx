import React from "react";
import { NavLink } from "react-router-dom";
import s from "../stylesheets/Nav.module.css";

export default function NavLinks({ open, home }) {
  function homeButton() {
    open(false);
    home(true);
  }
  function createButton() {
    open(false);
    home(false);
  }
  return (
    <ul>
      <NavLink
        onClick={() => (open ? homeButton() : null)}
        activeClassName={s.active}
        className={s.navlink}
        exact
        to={"/home"}
      >
        <li>Home</li>
      </NavLink>
      <NavLink
        onClick={() => (open ? createButton() : null)}
        activeClassName={s.active}
        className={s.navlink}
        exact
        to={"/create"}
      >
        <li>Create a Pokemon</li>
      </NavLink>
    </ul>
  );
}
