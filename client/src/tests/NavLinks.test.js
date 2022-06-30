import React from "react";
import { NavLink } from "react-router-dom";
import { shallow } from "enzyme";
import NavLinks from "../components/NavLinks.jsx";

describe("<NavBar />", () => {
  let nav;
  beforeEach(() => {
    nav = shallow(<NavLinks />);
    expect(nav).toBeTruthy();
  });

  it("Debería renderizar tres <NavLink />", () => {
    expect(nav.find(NavLink).length).toBe(2);
  });

  it('Debería tener un NavLink con el texto "Home" que cambie la ruta hacia "/home"', () => {
    expect(nav.find(NavLink).at(0).prop("to")).toEqual("/home");
  });

  it('Debería tener un NavLink con el texto "Create a Pokemon" que cambie la ruta hacia "/create"', () => {
    expect(nav.find(NavLink).at(1).prop("to")).toEqual("/create");
    expect(nav.find(NavLink).at(1).text()).toEqual("Create a Pokemon");
  });
});
