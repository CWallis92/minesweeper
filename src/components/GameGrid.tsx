import React, { useCallback, useState } from "react";
import { Grid, Box, Paper } from "@mui/material";

import { GameButton } from "../styles/gameGrid";
import { createBlankGrid, fillGrid, revealSquare } from "../utils/game";

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
  const [started, setStarted] = useState(false);
  const [grid, setGrid] = useState<Square[][]>(createBlankGrid(rows, cols));

  const clickSquare = useCallback(
    (row: number, col: number) => {
      setGrid((prevGrid) => {
        const grid = JSON.parse(JSON.stringify(prevGrid)) as Square[][];

        if (!started) {
          fillGrid(grid, row, col, mines);
          setStarted(true);
        }

        revealSquare(grid, row, col);

        return grid;
      });
    },
    [grid, mines, started]
  );

  return (
    <>
      <Box
        component={Paper}
        elevation={3}
        sx={{ width: 30 * rows, margin: "auto" }}
      >
        <Grid container spacing={0} columns={cols}>
          {grid.map((row, rowIndex) => {
            return row.map(({ revealed, value }, colIndex) => {
              return revealed ? (
                <Grid item xs={1} key={`${rowIndex}-${colIndex}`}>
                  {value}
                </Grid>
              ) : (
                <Grid item xs={1} key={`${rowIndex}-${colIndex}`}>
                  <GameButton
                    variant="contained"
                    color="gridButton"
                    size="small"
                    disableElevation
                    onClick={() => clickSquare(rowIndex, colIndex)}
                  ></GameButton>
                </Grid>
              );
            });
          })}
        </Grid>
      </Box>
    </>
  );
}
