import React, {
  Dispatch,
  forwardRef,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { Grid, Box, Paper } from "@mui/material";
import { red } from "@mui/material/colors";

import Flag from "../assets/flag";
import Question from "../assets/question";
import mine from "../assets/mine.png";
import { GameContext } from "../core/context";
import { GameButton, SquareValue } from "../styles/gameGrid";
import {
  fillGrid,
  getColor,
  isInProgress,
  revealSquare,
  toggleFlag,
} from "../utils/game";

interface GameGridProps {
  flagError: () => void;
  grid: Square[][];
  setGrid: Dispatch<SetStateAction<Square[][]>>;
}

const GameGrid = forwardRef(
  ({ flagError, grid, setGrid }: GameGridProps, ref): React.ReactElement => {
    const { gameState, setGameState } = useContext(GameContext);

    const clickSquare = useCallback(
      (row: number, col: number) => {
        setGrid((prevGrid) => {
          const grid = JSON.parse(JSON.stringify(prevGrid)) as Square[][];

          if (isInProgress(gameState) && !gameState.started) {
            fillGrid(grid, row, col, gameState.mines || 0);
            setGameState({ ...gameState, started: true });
          }

          revealSquare(grid, row, col);

          return grid;
        });
      },
      [gameState]
    );

    const setFlag = useCallback(
      (row: number, col: number) => {
        if (!isInProgress(gameState)) return;

        setGrid((prevGrid) => {
          const grid = JSON.parse(JSON.stringify(prevGrid)) as Square[][];

          if (
            gameState.flagsRemaining >= gameState.mines &&
            !grid[row][col].state
          ) {
            flagError();
          } else {
            toggleFlag(grid, row, col);
          }

          return grid;
        });
      },
      [gameState]
    );

    useEffect(() => {
      if (!isInProgress(gameState)) return;

      const boardState = grid.flat();

      const flagsRemaining = boardState.filter(
        ({ state, revealed }) => !revealed && state === "flagged"
      ).length;

      let ended = false,
        lost = false,
        won = false;

      if (boardState.find(({ revealed, value }) => revealed && value === "x")) {
        ended = true;
        lost = true;
      }

      if (
        boardState.filter(({ revealed }) => revealed).length +
          gameState.mines ===
        gameState.rows * gameState.cols
      ) {
        ended = true;
        won = true;
      }

      setGameState({ ...gameState, ended, won, lost, flagsRemaining });
    }, [grid]);

    if (!isInProgress(gameState)) return <></>;

    return (
      <Box
        ref={ref}
        component={Paper}
        elevation={3}
        sx={{ width: 30 * gameState.cols, margin: "auto" }}
      >
        {grid.map((row, rowIndex) => (
          <Grid container key={`${rowIndex}`}>
            {row.map(({ revealed, value, state, losingSquare }, colIndex) => (
              <Grid item key={`${rowIndex}-${colIndex}`}>
                {revealed || gameState.ended ? (
                  <SquareValue
                    sx={{
                      color: getColor(value as number),
                      backgroundColor: losingSquare ? red[500] : null,
                    }}
                  >
                    {value !== 0 && value !== "x" && (
                      <>
                        {state === "flagged" && gameState.ended ? (
                          <Flag crossed />
                        ) : (
                          value
                        )}
                      </>
                    )}
                    {value === "x" && (
                      <>
                        {gameState.won ? (
                          <Flag />
                        ) : (
                          <img
                            src={mine}
                            alt="mine"
                            style={{ width: "100%" }}
                          />
                        )}
                      </>
                    )}
                  </SquareValue>
                ) : (
                  <GameButton
                    variant="contained"
                    color="gridButton"
                    size="small"
                    disableElevation
                    onClick={() => {
                      if (state !== "flagged") clickSquare(rowIndex, colIndex);
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setFlag(rowIndex, colIndex);
                    }}
                  >
                    {state === "flagged" && <Flag />}
                    {state === "unknown" && <Question />}
                  </GameButton>
                )}
              </Grid>
            ))}
          </Grid>
        ))}
      </Box>
    );
  }
);

export default GameGrid;
