import chai, { expect } from "chai";
import Sinon from "sinon";
import sinonChai from "sinon-chai";

import * as utils from "../../utils/game";
import {
  createBlankGrid,
  fillGrid,
  placeMines,
  placeNumbers,
  revealSquare,
} from "../../utils/game";

chai.use(sinonChai);

describe("createBlankGrid", () => {
  it("creates a single nested array", () => {
    expect(createBlankGrid(1, 1)).to.deep.equal([
      [{ value: null, revealed: false }],
    ]);
  });
  it("returns multiple columns correctly", () => {
    expect(createBlankGrid(1, 5)).to.deep.equal([
      [
        { value: null, revealed: false },
        { value: null, revealed: false },
        { value: null, revealed: false },
        { value: null, revealed: false },
        { value: null, revealed: false },
      ],
    ]);
  });
  it("returns multiple rows and columns correctly", () => {
    expect(createBlankGrid(5, 5)).to.deep.equal([
      [
        { value: null, revealed: false },
        { value: null, revealed: false },
        { value: null, revealed: false },
        { value: null, revealed: false },
        { value: null, revealed: false },
      ],
      [
        { value: null, revealed: false },
        { value: null, revealed: false },
        { value: null, revealed: false },
        { value: null, revealed: false },
        { value: null, revealed: false },
      ],
      [
        { value: null, revealed: false },
        { value: null, revealed: false },
        { value: null, revealed: false },
        { value: null, revealed: false },
        { value: null, revealed: false },
      ],
      [
        { value: null, revealed: false },
        { value: null, revealed: false },
        { value: null, revealed: false },
        { value: null, revealed: false },
        { value: null, revealed: false },
      ],
      [
        { value: null, revealed: false },
        { value: null, revealed: false },
        { value: null, revealed: false },
        { value: null, revealed: false },
        { value: null, revealed: false },
      ],
    ]);
  });
});

describe("placeMines", () => {
  let startingGrid: Square[][];
  beforeEach(() => {
    startingGrid = createBlankGrid(9, 9);
  });

  it("does not place mines on the same square", () => {
    placeMines(startingGrid, 4, 5, 10);
    expect(
      startingGrid.flat().filter(({ value }) => value === "x").length
    ).to.equal(10);
  });
  it("does not place mines on the starting square", () => {
    placeMines(startingGrid, 4, 5, 80);
    expect(startingGrid[4][5].value).to.not.equal("x");
  });
});

describe("placeNumbers", () => {
  it("replaces all null values in the grid", () => {
    const startingGrid = createBlankGrid(9, 9);
    startingGrid[4][5].revealed = true;
    placeMines(startingGrid, 10);
    placeNumbers(startingGrid);
    expect(startingGrid.flat().some(({ value }) => value === null)).to.be.false;
  });

  it("places numbers correctly", () => {
    const startingGrid = createBlankGrid(4, 4);
    startingGrid[2][2].revealed = true;
    startingGrid[1][1].value = "x";
    startingGrid[3][3].value = "x";
    placeNumbers(startingGrid);
    expect(startingGrid).to.deep.equal([
      [
        {
          value: 1,
          revealed: false,
        },
        {
          value: 1,
          revealed: false,
        },
        {
          value: 1,
          revealed: false,
        },
        {
          value: 0,
          revealed: false,
        },
      ],
      [
        {
          value: 1,
          revealed: false,
        },
        {
          value: "x",
          revealed: false,
        },
        {
          value: 1,
          revealed: false,
        },
        {
          value: 0,
          revealed: false,
        },
      ],
      [
        {
          value: 1,
          revealed: false,
        },
        {
          value: 1,
          revealed: false,
        },
        {
          value: 2,
          revealed: true,
        },
        {
          value: 1,
          revealed: false,
        },
      ],
      [
        {
          value: 0,
          revealed: false,
        },
        {
          value: 0,
          revealed: false,
        },
        {
          value: 1,
          revealed: false,
        },
        {
          value: "x",
          revealed: false,
        },
      ],
    ]);
  });
});

describe("fillGrid", () => {
  let startingGrid: Square[][];
  beforeEach(() => {
    startingGrid = createBlankGrid(9, 9);
  });

  it("populates every square with a non-null value", () => {
    expect(
      startingGrid.every((row) => row.every(({ value }) => value === null))
    ).to.be.true;
    fillGrid(startingGrid, 0, 0, 10);
    expect(startingGrid.some((row) => row.some(({ value }) => value === null)))
      .to.be.false;
  });
});

describe("revealSquare", () => {
  it("sets revealed=true", () => {
    const grid = createBlankGrid(9, 9);
    fillGrid(grid, 0, 0, 10);
    revealSquare(grid, 0, 0);
    expect(grid[0][0].revealed).to.be.true;
  });

  it("reveals all adjacent squares", () => {
    const grid = createBlankGrid(4, 4);
    grid[2][2].value = "x";
    placeNumbers(grid);

    const spyReveal = Sinon.spy(utils, "revealSquare");

    spyReveal(grid, 0, 0);

    expect(spyReveal.callCount).to.equal(12);
  });
});
