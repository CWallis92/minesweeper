import React, { useEffect, useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { Div, RestartButton } from "../styles/gameDetails";

interface GameDetailsProps {
  gameGrid: any;
  gameState: GameState;
}

export default function GameDetails({ gameGrid, gameState }: GameDetailsProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!gameState.started || gameState.ended) return;

    setTimeout(() => {
      setTime(time + 10);
    }, 10);
  });

  return (
    <Div style={{ width: gameGrid?.current?.clientWidth }}>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Box
            component={Paper}
            square
            sx={{
              padding: "0.25em",
              width: 45,
              height: 45,
            }}
          >
            {gameState.mines - gameState.flagsRemaining}
          </Box>
        </Grid>
        <Grid item>
          <RestartButton
            variant="contained"
            color="primary"
            onClick={() => console.log("Reset")}
          >
            <RestartAltIcon sx={{ width: "100%" }} />
          </RestartButton>
        </Grid>
        <Grid item>
          <Box
            component={Paper}
            square
            sx={{
              padding: "0.25em",
              width: 45,
              height: 45,
            }}
          >
            {`${time >= 10000 ? "" : "0"}${Math.floor(time / 1000)}`}
          </Box>
        </Grid>
      </Grid>
    </Div>
  );
}
