import React from "react";
import { Container } from "@mui/material";

import GameGrid from "./GameGrid";

const GameArea = (): React.ReactElement => {
  return (
    <main>
      <Container>
        <GameGrid rows={9} cols={9} mines={10} />
      </Container>
    </main>
  );
};

export default GameArea;
