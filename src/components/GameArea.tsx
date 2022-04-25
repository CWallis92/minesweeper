import React from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";

import GameGrid from "./GameGrid";

const GameArea = (): React.ReactElement => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      component={Container}
    >
      <Grid item>
        <Typography variant="body1">Hello</Typography>
      </Grid>
      <Grid item>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          component={Paper}
          elevation={3}
          sx={{
            width: "500px !important",
            margin: "auto",
            marginLeft: "auto !important",
          }}
        >
          <GameGrid rows={9} cols={9} mines={10} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GameArea;
