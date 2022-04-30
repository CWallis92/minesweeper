import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Container,
  FormControlLabel,
  Grid,
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
      <Container>
        <Toolbar>
          <div>
            <img
              src={mine}
              alt="mine"
              style={{ width: 40, display: "block", marginRight: 50 }}
            />
          </div>
          <Grid container justifyContent="center">
            <MenuItem onClick={() => history.push("/")}>
              <Typography variant="h6">Play</Typography>
            </MenuItem>
            <MenuItem onClick={() => history.push("/hi-scores")}>
              <Typography variant="h6">Hi-Scores</Typography>
            </MenuItem>
          </Grid>
          <FormControlLabel
            sx={{ marginRight: 0 }}
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
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
