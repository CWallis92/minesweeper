import React, { useCallback, useContext, useState } from "react";
import { Grid, Box, Paper } from "@mui/material";

import Flag from "../assets/flag";
import { GameButton, SquareValue } from "../styles/gameGrid";
import {
  createBlankGrid,
  fillGrid,
  getColor,
  revealSquare,
  toggleFlag,
} from "../utils/game";
import Question from "../assets/question";

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
    [mines, started]
  );

  const setFlag = useCallback((row: number, col: number) => {
    setGrid((prevGrid) => {
      const grid = JSON.parse(JSON.stringify(prevGrid)) as Square[][];

      toggleFlag(grid, row, col);

      return grid;
    });
  }, []);

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{ width: 30 * rows, margin: "auto" }}
    >
      <Grid container spacing={0} columns={cols}>
        {grid.map((row, rowIndex) => {
          return row.map(({ revealed, value, state }, colIndex) => {
            return revealed ? (
              <Grid item xs={1} key={`${rowIndex}-${colIndex}`}>
                <SquareValue
                  sx={{
                    color: getColor(value as number),
                  }}
                >
                  {value !== 0 && value}
                </SquareValue>
              </Grid>
            ) : (
              <Grid item xs={1} key={`${rowIndex}-${colIndex}`}>
                <GameButton
                  variant="contained"
                  color="gridButton"
                  size="small"
                  disableElevation
                  onClick={() => {
                    if (state !== "flagged") clickSquare(rowIndex, colIndex);
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setFlag(rowIndex, colIndex);
                  }}
                >
                  {state === "flagged" && <Flag />}
                  {state === "unknown" && <Question />}
                </GameButton>
              </Grid>
            );
          });
        })}
      </Grid>
    </Box>
  );
}
