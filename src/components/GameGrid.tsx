import React, { useMemo } from "react";
import { Grid, Box, Paper } from "@mui/material";

import Game from "../utils/game";
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
  const game = useMemo(() => new Game(rows, cols, mines), [rows, cols, mines]);

  return (
    <>
      <Box
        component={Paper}
        elevation={3}
        sx={{ width: 30 * rows, margin: "auto" }}
      >
        <Grid container spacing={0} columns={cols}>
          {game.grid.map((row: Square[], rowIndex) => {
            return row.map(({ revealed }, colIndex) => {
              return revealed ? (
                <Grid item xs={1} key={`${rowIndex}-${colIndex}`}>
                  <p>state</p>
                </Grid>
              ) : (
                <Grid item xs={1} key={`${rowIndex}-${colIndex}`}>
                  <GameButton
                    variant="contained"
                    color="gridButton"
                    size="small"
                    disableElevation
                    onClick={() => {
                      game.revealSquare(rowIndex, colIndex);
                    }}
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
