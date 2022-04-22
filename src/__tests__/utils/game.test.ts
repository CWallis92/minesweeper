import { expect } from "chai";

import { createBlankGrid } from "../../utils/game";

describe("createBlankGrid", () => {
  it("creates a single nested array", () => {
    expect(createBlankGrid(1, 1)).to.deep.equal([
      [{ state: null, revealed: false }],
    ]);
  });
  it("returns multiple columns correctly", () => {
    expect(createBlankGrid(1, 5)).to.deep.equal([
      [
        { state: null, revealed: false },
        { state: null, revealed: false },
        { state: null, revealed: false },
        { state: null, revealed: false },
        { state: null, revealed: false },
      ],
    ]);
  });
  it("returns multiple rows and columns correctly", () => {
    expect(createBlankGrid(5, 5)).to.deep.equal([
      [
        { state: null, revealed: false },
        { state: null, revealed: false },
        { state: null, revealed: false },
        { state: null, revealed: false },
        { state: null, revealed: false },
      ],
      [
        { state: null, revealed: false },
        { state: null, revealed: false },
        { state: null, revealed: false },
        { state: null, revealed: false },
        { state: null, revealed: false },
      ],
      [
        { state: null, revealed: false },
        { state: null, revealed: false },
        { state: null, revealed: false },
        { state: null, revealed: false },
        { state: null, revealed: false },
      ],
      [
        { state: null, revealed: false },
        { state: null, revealed: false },
        { state: null, revealed: false },
        { state: null, revealed: false },
        { state: null, revealed: false },
      ],
      [
        { state: null, revealed: false },
        { state: null, revealed: false },
        { state: null, revealed: false },
        { state: null, revealed: false },
        { state: null, revealed: false },
      ],
    ]);
  });
});
