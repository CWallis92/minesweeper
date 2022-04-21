import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import App from "../components/App";

test("renders Hello", () => {
  render(<App />);

  const linkElement = screen.getByText(/hello/i);
  expect(linkElement).toBeInTheDocument();
});
