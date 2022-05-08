import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Button, CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";

import Nav from "./Nav";
import GameArea from "./GameArea";
import modeTheme from "../core/theme";
import { ColorModeContext, GameContext } from "../core/context";

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

  const startGame = () => {
    setGameState({
      ...gameState,
      difficulty: "easy",
      rows: 9,
      cols: 9,
      mines: 10,
      flagsRemaining: 10,
    });
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <GameContext.Provider value={{ gameState, setGameState }}>
          <CssBaseline />
          <Nav />
          {gameState.difficulty !== null ? (
            <GameArea />
          ) : (
            <Button onClick={startGame}>Start game</Button>
          )}
          {gameState.ended && <p>Ended</p>}
        </GameContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
