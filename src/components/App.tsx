import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import Nav from "./Nav";
import GameArea from "./GameArea";
import { lightTheme, darkTheme } from "../styles/theme";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Nav darkMode={darkMode} setDarkMode={setDarkMode} />
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
  );
}
