import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent } from "@testing-library/react";
import { render as rtlRender } from "@testing-library/react";
import SearchBar from "../components/SearchBar";
import { Provider } from "react-redux";
import { store } from "../redux/store";
const render = (component) =>
  rtlRender(<Provider store={store}>{component}</Provider>);

describe("<SearchBar />", () => {
  it("Render component <SearchBar />", () => {
    const component = render(<SearchBar />);
  });

  it("Change button 'Refresh' to 'Search'", () => {
    const component = render(<SearchBar />);
    const input = component.getByTestId("searchBar");
    component.getByText("Refresh");
    fireEvent.change(input, { target: { value: "hi" } });
    component.getByText("Search");
  });

  it("Have a button with type 'submit'", () => {
    const component = render(<SearchBar />);
    const button = component.getByTestId("button");
    expect(button.type).toBe("submit");
  });
});
