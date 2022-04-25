import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

import { createBlankGrid } from "../utils/game";
import { Grid, Paper } from "@mui/material";

interface GameGridProps {
  rows: number;
  cols: number;
  mines: number;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
      {grid.map((row, index) => {
        return (
          <Grid
            container
            item
            xs={6}
            key={index}
            sx={{
              flexBasis: "100% !important",
              maxWidth: "100% !important",
              width: "100%",
            }}
          >
            {row.map(({ revealed }, i) => {
              if (!revealed) {
                return <Item key={`${index}-${i}`}>Hi</Item>;
              }

              return <Item key={`${index}-${i}`}>state</Item>;
            })}
          </Grid>
        );
      })}
    </>
  );
}
