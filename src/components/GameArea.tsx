import React, { useCallback, useState } from "react";
import { Container } from "@mui/material";

import GameGrid from "./GameGrid";

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

  const flagError = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }, []);

  return (
    <main>
      <p className={shake ? "shake" : undefined}>
        Flags remaining: {gameState.mines - gameState.flagsRemaining}
      </p>
      <Container>
        <GameGrid
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
