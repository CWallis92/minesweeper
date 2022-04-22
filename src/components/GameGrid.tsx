import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { createBlankGrid, fillGrid } from "../utils/game";

interface GameGridProps {
  rows: number;
  cols: number;
  mines: number;
}

export default function GameGrid({
  rows,
  cols,
  mines,
}: GameGridProps): React.ReactElement {
  const [grid, setGrid] = useState<Square[][]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const initialGrid = createBlankGrid(rows, cols);

    console.log(initialGrid);

    setGrid(initialGrid);
  }, []);

  // useEffect(() => {
  //   if (gameStarted) {
  //     const filledGrid = fillGrid(grid.length, grid[0].length, mines)
  //     setGrid();
  //   }

  // }, [gameStarted]);

  return (
    <>
      {grid.map((row, index) => {
        return (
          <div key={index}>
            {row.map((square, i) => {
              return <p key={i}>H</p>;
            })}
          </div>
        );
      })}
    </>
  );
}
