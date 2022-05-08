import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Container } from "@mui/material";

import GameGrid from "./GameGrid";
import GameDetails from "./GameDetails";
import { createBlankGrid } from "../utils/game";
import { GameContext } from "../core/context";

const GameArea = (): React.ReactElement => {
  const { gameState } = useContext(GameContext);

  const [shake, setShake] = useState(false);
  const [grid, setGrid] = useState<Square[][]>(
    createBlankGrid(gameState.rows!, gameState.cols!)
  );

  const gameGrid = useRef<HTMLDivElement>();

  const flagError = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }, []);

  return (
    <main>
      <Container>
        <GameDetails gameGrid={gameGrid} shake={shake} setGrid={setGrid} />
        <GameGrid
          ref={gameGrid}
          flagError={flagError}
          grid={grid}
          setGrid={setGrid}
        />
      </Container>
    </main>
  );
};

export default GameArea;
