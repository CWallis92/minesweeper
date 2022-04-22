export const createBlankGrid = (rows: number, cols: number): Square[][] => {
  const grid: Square[][] = Array.from(new Array(rows), (row) =>
    Array.from(new Array(cols), (col) => ({ state: null, revealed: false }))
  );

  return grid;
};

export const fillGrid = (
  row: number,
  col: number,
  mines: number
): Square[][] => {
  return [];
};
