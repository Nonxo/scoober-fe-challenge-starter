import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";

jest.mock("./components/Game", () => <div data-testid="game" />);

test("renders app component", () => {
  const { getByTestId } = render(<App />);
  const gameComponent = getByTestId("app");
  expect(gameComponent).not.toEqual(null);
});
