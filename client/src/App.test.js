import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";

test("renders app component", () => {
  const { getByTestId } = render(<App />);
  const gameComponent = getByTestId("app");
  expect(gameComponent).not.toEqual(null);
});
