import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import GameGrid from "./GameGrid";
import GameDetails from "./GameDetails";
import { createBlankGrid, isInProgress } from "../utils/game";
import { GameContext } from "../core/context";

const GameArea = (): React.ReactElement => {
  const { gameState } = useContext(GameContext);

  const [shake, setShake] = useState(false);
  const [grid, setGrid] = useState<Square[][]>([]);

  const gameGrid = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!isInProgress(gameState)) return;

    setGrid(createBlankGrid(gameState.rows, gameState.cols));
  }, []);

  const flagError = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }, []);

  return (
    <>
      <GameDetails gameGrid={gameGrid} shake={shake} setGrid={setGrid} />
      <GameGrid
        ref={gameGrid}
        flagError={flagError}
        grid={grid}
        setGrid={setGrid}
      />
    </>
  );
};

export default GameArea;
