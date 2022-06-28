import React, { useState } from "react";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks.jsx";
import s from "../stylesheets/Nav.module.css";
import AllFilters from "./AllFilters";

export default function NavBarMobile() {
  const [open, setOpen] = useState(false);
  const [home, setHome] = useState(
    /.+(?=\/home$).+/.test(window.location.href)
  );
  return (
    <div className={s.mobileCont}>
      <nav className={`${s.navMobile} ${open ? s.openHam : null}`}>
        <NavLinks open={setOpen} home={setHome} />
        <AllFilters open={open} home={home} />
      </nav>
      <button className={s.hamburguer} onClick={() => setOpen(!open)}>
        ☰
      </button>
      <div
        className={`${s.mobileContSearch} ${
          /.+(?=\/home$).+/.test(window.location.href) ? null : s.searchHome
        }`}
      >
        <SearchBar className={s.searchMobile} />
      </div>
    </div>
  );
}
