import React, { useCallback, useRef, useState } from "react";
import { Box, Container, Grid, Paper } from "@mui/material";

import GameGrid from "./GameGrid";
import GameDetails from "./GameDetails";

const GameArea = (): React.ReactElement => {
  const [shake, setShake] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    started: false,
    ended: false,
    won: false,
    lost: false,
    rows: 9,
    cols: 9,
    mines: 10,
    flagsRemaining: 0,
  });

  const gameGrid = useRef<HTMLDivElement>();

  const flagError = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }, []);

  return (
    <main>
      <Container>
        <GameDetails gameGrid={gameGrid} gameState={gameState} />
        <GameGrid
          ref={gameGrid}
          gameState={gameState}
          setGameState={setGameState}
          flagError={flagError}
        />
      </Container>
      {gameState.ended && <p>Ended</p>}
    </main>
  );
};

export default GameArea;
