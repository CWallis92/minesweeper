import React, { useEffect, useState } from "react";

import { createBlankGrid } from "../utils/game";
import { Grid } from "@mui/material";

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
                return <div key={`${index}-${i}`}>Hi</div>;
              }

              return <div key={`${index}-${i}`}>state</div>;
            })}
          </Grid>
        );
      })}
    </>
  );
}
