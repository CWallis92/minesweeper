import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";

import Nav from "./Nav";
import GameArea from "./GameArea";
import modeTheme, { ColorModeContext } from "../core/theme";

export default function App() {
  const [mode, setMode] = useState<PaletteMode>(
    (window.localStorage.getItem("darkMode") as PaletteMode) || "light"
  );

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
