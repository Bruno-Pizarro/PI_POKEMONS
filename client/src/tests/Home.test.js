import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { shallow } from "enzyme";
import Home from "../components/Home.jsx";
import AllFilters from "../components/AllFilters.jsx";
import Cards from "../components/Cards.jsx";

describe("<Home />", () => {
  let home;
  beforeEach(() => {
    home = shallow(<Home />);
    expect(home).toBeTruthy();
  });

  it("Debería renderizar el componente <AllFilters />", () => {
    expect(home.find(AllFilters).length).toBe(1);
  });

  it("Debería renderizar el componente <Cards />", () => {
    expect(home.find(Cards).length).toBe(1);
  });
});
