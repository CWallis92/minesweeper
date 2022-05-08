import React, { useContext } from "react";
import {
  AppBar,
  Container,
  FormControlLabel,
  Grid,
  Switch,
  Toolbar,
  useTheme,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";

import mine from "../assets/mine.png";
import { ColorModeContext } from "../core/context";

const Nav = (): React.ReactElement => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar enableColorOnDark color="primary" position="static">
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
            <h1>Minesweeper</h1>
          </Grid>
          <FormControlLabel
            sx={{ marginRight: 0 }}
            control={
              <Switch
                checked={theme.palette.mode === "dark"}
                onChange={() => {
                  colorMode.toggleColorMode();
                }}
                name="darkMode"
                color="default"
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
