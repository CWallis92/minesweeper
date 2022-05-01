export default class Game {
  readonly mines: number;
  private started: boolean;
  public grid: Square[][];

  constructor(rows: number, cols: number, mines: number) {
    this.started = false;
    this.mines = mines;
    this.grid = this.createBlankGrid(rows, cols);
  }

  private createBlankGrid = (rows: number, cols: number): Square[][] => {
    return Array.from(new Array(rows), () =>
      Array.from(new Array(cols), () => ({ value: null, revealed: false }))
    );
  };

  private placeMines() {
    let minesToPlace = this.mines;

    while (minesToPlace > 0) {
      let row = Math.floor(Math.random() * this.grid.length),
        col = Math.floor(Math.random() * this.grid[0].length);

      while (
        this.grid[row][col].revealed ||
        this.grid[row][col].value !== null
      ) {
        row = Math.floor(Math.random() * this.grid.length);
        col = Math.floor(Math.random() * this.grid[0].length);
      }

      this.grid[row][col].value = "x";

      minesToPlace--;
    }
  }

  private placeNumbers() {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        if (this.grid[row][col].value === "x") continue;

        // Create surrounding array
        const surroundingSquares = [
          this.grid[row][col - 1],
          this.grid[row][col + 1],
        ];
        if (!!this.grid[row - 1])
          surroundingSquares.push(
            ...this.grid[row - 1].slice(Math.max(col - 1, 0), col + 2)
          );
        if (!!this.grid[row + 1])
          surroundingSquares.push(
            ...this.grid[row + 1].slice(Math.max(col - 1, 0), col + 2)
          );

        this.grid[row][col].value = surroundingSquares.reduce((acc, curr) => {
          return acc + (curr?.value === "x" ? 1 : 0);
        }, 0);
      }
    }
  }

  private fillGrid(startRow: number, startCol: number) {
    this.grid[startRow][startCol].revealed = true;
    this.placeMines();
    this.placeNumbers();
    this.started = true;
  }

  public revealSquare(row: number, col: number) {
    if (!this.started) this.fillGrid(row, col);

    this.grid[row][col].revealed = true;
  }
}
