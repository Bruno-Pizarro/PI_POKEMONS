import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { shallow } from "enzyme";
import { Route } from "react-router-dom";

describe("<App />", () => {
  let app;
  beforeEach(() => {
    app = shallow(<App />);
    expect(app).toBeTruthy();
  });

  it("Debería renderizar 5 <Routes />", () => {
    expect(app.find(Route).length).toBe(5);
  });
});
