import { expect } from "chai";

import { createBlankGrid } from "../../utils/game";

describe("createBlankGrid", () => {
  it("should ", () => {
    expect(createBlankGrid(1, 1)).to.deep.equal([
      [{ state: null, revealed: false }],
    ]);
  });
});
