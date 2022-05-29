import React, {
  useEffect,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { Box, Grid, Paper } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { GameContext } from "../core/context";
import { Div, MenuButton } from "../styles/gameDetails";
import { createBlankGrid, isInProgress } from "../utils/game";

interface GameDetailsProps {
  gameGrid: any;
  shake: boolean;
  setGrid: Dispatch<SetStateAction<Square[][]>>;
}

export default function GameDetails({
  gameGrid,
  shake,
  setGrid,
}: GameDetailsProps) {
  const { gameState, setGameState } = useContext(GameContext);

  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!gameState.started || gameState.ended) return;

    setTimeout(() => {
      setTime(time + 10);
    }, 10);
  });

  const restartGame = () => {
    if (!isInProgress(gameState)) return;

    setGameState({
      ...gameState,
      started: false,
      ended: false,
      won: false,
      lost: false,
    });

    setGrid(createBlankGrid(gameState.rows, gameState.cols));

    setTime(0);
  };

  const exitGame = () => {
    setGameState({
      difficulty: null,
      started: false,
      ended: false,
      won: false,
      lost: false,
    });
  };

  if (!isInProgress(gameState)) return <></>;

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
            className={shake ? "shake" : undefined}
          >
            {gameState.mines - gameState.flagsRemaining}
          </Box>
        </Grid>
        <Grid item>
          <MenuButton variant="contained" color="primary" onClick={exitGame}>
            <ArrowBackIcon sx={{ width: "100%" }} />
          </MenuButton>
        </Grid>
        <Grid item>
          <MenuButton variant="contained" color="primary" onClick={restartGame}>
            <RestartAltIcon sx={{ width: "100%" }} />
          </MenuButton>
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
