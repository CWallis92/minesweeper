import React, { useState } from "react";
import { Container } from "@mui/material";

import GameGrid from "./GameGrid";

const GameArea = (): React.ReactElement => {
  const [gameState, setGameState] = useState<GameState>({
    started: false,
    ended: false,
    won: false,
    lost: false,
    flagsRemaining: 0,
  });

  return (
    <main>
      <Container>
        <GameGrid
          rows={9}
          cols={9}
          mines={10}
          gameState={gameState}
          setGameState={setGameState}
        />
      </Container>
      {gameState.ended && <p>Ended</p>}
    </main>
  );
};

export default GameArea;
