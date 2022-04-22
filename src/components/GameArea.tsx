import React, { useState } from "react";
import { Container, Grid, Paper, Typography } from "@material-ui/core";

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
        <Paper elevation={3} className={classes.paper}>
          <GameGrid rows={9} cols={9} mines={10} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default GameArea;
