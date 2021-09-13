import { Container, Grid, Paper, Typography } from "@material-ui/core";

import useStyles from "../styles/gameArea";

const GameArea = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      component={Container}
      className={classes.root}
    >
      <Grid item>
        <Typography variant="body1">Hello</Typography>
      </Grid>
      <Grid item>
        <Paper elevation={3} className={classes.paper}></Paper>
      </Grid>
    </Grid>
  );
};

export default GameArea;
