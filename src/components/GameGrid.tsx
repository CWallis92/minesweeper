import React, { useEffect, useState } from "react";
import { Grid, styled, Box, Paper } from "@mui/material";

import { createBlankGrid } from "../utils/game";

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  width: "30px",
  height: "30px",
}));

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
                <Grid item xs={1} key={index}>
                  <Item key={`${index}-${i}`}>state</Item>
                </Grid>
              ) : (
                <Grid item xs={1} key={index}>
                  <Item key={`${index}-${i}`}>Hi</Item>
                </Grid>
              );
            });
          })}
        </Grid>
      </Box>
    </>
  );
}
