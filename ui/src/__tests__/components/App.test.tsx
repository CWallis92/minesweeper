import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import App from "../../components/App";

test("renders Minesweeper", () => {
  render(<App />);

  const linkElement = screen.getByText(/Minesweeper/i);
  expect(linkElement).toBeInTheDocument();
});
