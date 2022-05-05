import React, {
  Dispatch,
  forwardRef,
  Ref,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Grid, Box, Paper } from "@mui/material";
import { red } from "@mui/material/colors";

import Flag from "../assets/flag";
import Question from "../assets/question";
import mine from "../assets/mine.png";
import { GameButton, SquareValue } from "../styles/gameGrid";
import {
  createBlankGrid,
  fillGrid,
  getColor,
  revealSquare,
  toggleFlag,
} from "../utils/game";

interface GameGridProps {
  ref: Ref<HTMLDivElement>;
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
  flagError: () => void;
}

const GameGrid = forwardRef(
  (
    { gameState, setGameState, flagError }: GameGridProps,
    ref
  ): React.ReactElement => {
    const [grid, setGrid] = useState<Square[][]>(
      createBlankGrid(gameState.rows, gameState.cols)
    );

    const clickSquare = useCallback(
      (row: number, col: number) => {
        setGrid((prevGrid) => {
          const grid = JSON.parse(JSON.stringify(prevGrid)) as Square[][];

          if (!gameState.started) {
            fillGrid(grid, row, col, gameState.mines);
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

    return (
      <>
        <Box
          ref={ref}
          component={Paper}
          elevation={3}
          sx={{ width: 30 * gameState.rows, margin: "auto" }}
        >
          <Grid container spacing={0} columns={gameState.cols}>
            {grid.map((row, rowIndex) => {
              return row.map(
                ({ revealed, value, state, losingSquare }, colIndex) => {
                  return revealed || gameState.ended ? (
                    <Grid item xs={1} key={`${rowIndex}-${colIndex}`}>
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
                    </Grid>
                  ) : (
                    <Grid item xs={1} key={`${rowIndex}-${colIndex}`}>
                      <GameButton
                        variant="contained"
                        color="gridButton"
                        size="small"
                        disableElevation
                        onClick={() => {
                          if (state !== "flagged")
                            clickSquare(rowIndex, colIndex);
                        }}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          setFlag(rowIndex, colIndex);
                        }}
                      >
                        {state === "flagged" && <Flag />}
                        {state === "unknown" && <Question />}
                      </GameButton>
                    </Grid>
                  );
                }
              );
            })}
          </Grid>
        </Box>
      </>
    );
  }
);

export default GameGrid;
