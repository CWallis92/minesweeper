import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  FormControlLabel,
  MenuItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";

import mine from "../assets/mine.png";
import { ColorModeContext } from "../core/theme";

const Nav = (): React.ReactElement => {
  const colorMode = useContext(ColorModeContext);

  const [darkMode, setDarkMode] = useState(colorMode.currColor === "dark");

  let history = useHistory();

  return (
    <AppBar position="static">
      <Toolbar>
        <div>
          <img
            src={mine}
            alt="mine"
            style={{ width: "40px", display: "block" }}
          />
        </div>
        <MenuItem onClick={() => history.push("/")}>
          <Typography variant="h6">Play</Typography>
        </MenuItem>
        <MenuItem onClick={() => history.push("/hi-scores")}>
          <Typography variant="h6">Hi-Scores</Typography>
        </MenuItem>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={() => {
                colorMode.toggleColorMode();
                setDarkMode(!darkMode);
              }}
              name="darkMode"
            />
          }
          label={<Brightness4Icon />}
          style={{ marginLeft: "auto" }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
