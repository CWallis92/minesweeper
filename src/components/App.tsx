import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";

import Nav from "./Nav";
import GameArea from "./GameArea";
import getDesignTokens, { ColorModeContext } from "../core/theme";

export default function App() {
  const [mode, setMode] = useState<PaletteMode>(
    (window.localStorage.getItem("darkMode") || "light") as PaletteMode
  );

  const colorMode = useMemo(
    () => ({
      currColor: (window.localStorage.getItem("darkMode") ||
        "light") as PaletteMode,
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

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/">
              <GameArea />
            </Route>
            <Route exact path="/hi-scores">
              <h1>Hello</h1>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
