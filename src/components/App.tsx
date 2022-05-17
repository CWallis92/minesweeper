import React, { useMemo, useState } from "react";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";

import Nav from "./Nav";
import GameArea from "./GameArea";
import modeTheme from "../core/theme";
import { ColorModeContext, GameContext } from "../core/context";
import HiScores from "./HiScores";

export default function App() {
  const [mode, setMode] = useState<PaletteMode>(
    (window.localStorage.getItem("darkMode") as PaletteMode) || "light"
  );
  const [gameState, setGameState] = useState<GameState>({
    difficulty: null,
    started: false,
    ended: false,
    won: false,
    lost: false,
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          window.localStorage.setItem(
            "darkMode",
            prevMode === "light" ? "dark" : "light"
          );
          return prevMode === "light" ? "dark" : "light";
        });
      },
    }),
    []
  );

  const theme = useMemo(() => modeTheme(mode), [mode]);

  const startGame = (difficulty: Difficulty) => {
    let rows, cols, mines;

    switch (difficulty) {
      case "medium":
        rows = 16;
        cols = 16;
        mines = 40;
        break;
      case "hard":
        rows = 16;
        cols = 30;
        mines = 99;
        break;
      default:
        rows = 9;
        cols = 9;
        mines = 10;
        break;
    }

    setGameState({
      ...gameState,
      difficulty,
      rows,
      cols,
      mines,
      flagsRemaining: mines,
    });
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <GameContext.Provider value={{ gameState, setGameState }}>
          <CssBaseline />
          <Nav />
          <main>
            <Container>
              {gameState.difficulty !== null ? (
                <GameArea />
              ) : (
                <Grid
                  container
                  justifyContent="space-around"
                  sx={{ width: 450, maxWidth: "90%", margin: "auto" }}
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => startGame("easy")}
                    >
                      Easy
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => startGame("medium")}
                    >
                      Medium
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => startGame("hard")}
                    >
                      Hard
                    </Button>
                  </Grid>
                </Grid>
              )}
              <HiScores />
            </Container>
          </main>
        </GameContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
