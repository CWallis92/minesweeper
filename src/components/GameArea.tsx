import React from "react";
import { Container } from "@mui/material";

import GameGrid from "./GameGrid";

const GameArea = (): React.ReactElement => {
  return (
    <main>
      <Container>
        <GameGrid rows={4} cols={4} mines={1} />
      </Container>
    </main>
  );
};

export default GameArea;
