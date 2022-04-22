import { Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";

import useStyles from "../styles/gameArea";
import GameGrid from "./GameGrid";

const GameArea = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      component={Container}
      className={classes.root}
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
          className={classes.paper}
          elevation={3}
        >
          <GameGrid rows={9} cols={9} mines={10} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GameArea;
