import React, {
  Dispatch,
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
  rows: number;
  cols: number;
  mines: number;
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
}

export default function GameGrid({
  rows,
  cols,
  mines,
  gameState,
  setGameState,
}: GameGridProps): React.ReactElement {
  const [grid, setGrid] = useState<Square[][]>(createBlankGrid(rows, cols));

  const clickSquare = useCallback(
    (row: number, col: number) => {
      setGrid((prevGrid) => {
        const grid = JSON.parse(JSON.stringify(prevGrid)) as Square[][];

        if (!gameState.started) {
          fillGrid(grid, row, col, mines);
          setGameState({ ...gameState, started: true });
        }

        revealSquare(grid, row, col);

        return grid;
      });
    },
    [mines, gameState]
  );

  const setFlag = useCallback((row: number, col: number) => {
    setGrid((prevGrid) => {
      const grid = JSON.parse(JSON.stringify(prevGrid)) as Square[][];

      toggleFlag(grid, row, col);

      return grid;
    });
  }, []);

  useEffect(() => {
    const boardState = grid.flat();

    if (boardState.find((square) => square.revealed && square.value === "x")) {
      setGameState({ ...gameState, ended: true, lost: true });
    }
  }, [grid]);

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{ width: 30 * rows, margin: "auto" }}
    >
      <Grid container spacing={0} columns={cols}>
        {grid.map((row, rowIndex) => {
          return row.map(
            ({ revealed, value, state, losingSquare }, colIndex) => {
              return revealed ? (
                <Grid item xs={1} key={`${rowIndex}-${colIndex}`}>
                  <SquareValue
                    sx={{
                      color: getColor(value as number),
                      backgroundColor: losingSquare ? red[500] : null,
                    }}
                  >
                    {value !== "x" && state === "flagged" && revealed && (
                      <Flag />
                    )}
                    {value !== 0 && value !== "x" && value}
                    {value === "x" && (
                      <img src={mine} alt="mine" style={{ width: "100%" }} />
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
                </Grid>
              );
            }
          );
        })}
      </Grid>
    </Box>
  );
}
