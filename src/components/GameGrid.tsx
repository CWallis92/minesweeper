import React, { useEffect, useState } from "react";
import { Grid, Box, Paper } from "@mui/material";

import { createBlankGrid } from "../utils/game";
import { GameButton } from "../styles/gameGrid";

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

  useEffect(() => {
    const initialGrid = createBlankGrid(rows, cols);
    setGrid(initialGrid);
  }, [cols, rows]);

  return (
    <>
      <Box
        component={Paper}
        square
        elevation={3}
        sx={{ width: 30 * rows, margin: "auto" }}
      >
        <Grid container spacing={0} columns={cols}>
          {grid.map((row, index) => {
            return row.map(({ revealed }, i) => {
              return revealed ? (
                <Grid item xs={1} key={`${index}-${i}`}>
                  <p>state</p>
                </Grid>
              ) : (
                <Grid item xs={1} key={`${index}-${i}`}>
                  <GameButton>Hi!</GameButton>
                </Grid>
              );
            });
          })}
        </Grid>
      </Box>
    </>
  );
}
