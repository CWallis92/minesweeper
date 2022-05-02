// Required for sinon to check recursive function of revealSquare
import {
  blue,
  brown,
  cyan,
  deepPurple,
  green,
  purple,
  red,
} from "@mui/material/colors";
import * as utils from "./game";

export const getColor = (num: number) => {
  switch (num) {
    case 1:
      return blue[500];
    case 2:
      return green[500];
    case 3:
      return red[500];
    case 4:
      return purple[500];
    case 5:
      return deepPurple[500];
    case 6:
      return cyan[500];
    case 7:
      return brown[500];
    default:
      return null;
  }
};

export const createBlankGrid = (rows: number, cols: number): Square[][] =>
  Array.from(new Array(rows), () =>
    Array.from(new Array(cols), () => ({ value: null, revealed: false }))
  );

export const placeMines = (
  grid: Square[][],
  startRow: number,
  startCol: number,
  mines: number
) => {
  let minesToPlace = mines;

  while (minesToPlace > 0) {
    let row = Math.floor(Math.random() * grid.length),
      col = Math.floor(Math.random() * grid[0].length);

    while (
      (row === startRow && col === startCol) ||
      grid[row][col].value !== null
    ) {
      row = Math.floor(Math.random() * grid.length);
      col = Math.floor(Math.random() * grid[0].length);
    }

    grid[row][col].value = "x";

    minesToPlace--;
  }
};

export const placeNumbers = (grid: Square[][]) => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col].value === "x") continue;

      // Create surrounding array
      const neighbouringSquares = [grid[row][col - 1], grid[row][col + 1]];
      if (!!grid[row - 1])
        neighbouringSquares.push(
          ...grid[row - 1].slice(Math.max(col - 1, 0), col + 2)
        );
      if (!!grid[row + 1])
        neighbouringSquares.push(
          ...grid[row + 1].slice(Math.max(col - 1, 0), col + 2)
        );

      grid[row][col].value = neighbouringSquares.reduce((acc, curr) => {
        return acc + (curr?.value === "x" ? 1 : 0);
      }, 0);
    }
  }
};

export const fillGrid = (
  grid: Square[][],
  startRow: number,
  startCol: number,
  mines: number
) => {
  placeMines(grid, startRow, startCol, mines);
  placeNumbers(grid);
};

export const revealSquare = (
  grid: Square[][],
  startRow: number,
  startCol: number
) => {
  grid[startRow][startCol].revealed = true;

  if (grid[startRow][startCol].value === "x") {
    grid[startRow][startCol].losingSquare = true;
  }

  if (grid[startRow][startCol].value === 0) {
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (row === 0 && col === 0) continue;

        const rowCheck = startRow + row;
        const colCheck = startCol + col;

        if (
          grid[rowCheck] &&
          grid[rowCheck][colCheck] &&
          !grid[rowCheck][colCheck].revealed &&
          grid[rowCheck][colCheck].value !== "x"
        ) {
          utils.revealSquare(grid, rowCheck, colCheck);
        }
      }
    }
  }
};

export const toggleFlag = (grid: Square[][], row: number, col: number) => {
  switch (grid[row][col].state) {
    case "flagged":
      grid[row][col].state = "unknown";
      break;
    case "unknown":
      grid[row][col].state = null;
      break;
    default:
      grid[row][col].state = "flagged";
      break;
  }
};
