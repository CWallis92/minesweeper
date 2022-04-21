import React, { Dispatch, SetStateAction } from "react";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  FormControlLabel,
  Switch,
  makeStyles,
  Typography,
  MenuItem,
} from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";

import mine from "../assets/mine.png";

const useStyles = makeStyles({
  darkModeSwitch: {
    marginLeft: "auto",
  },
});

interface NavProps {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

const Nav = ({ darkMode, setDarkMode }: NavProps): React.ReactElement => {
  const classes = useStyles();

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
              onChange={() => setDarkMode(!darkMode)}
              name="darkMode"
            />
          }
          label={<Brightness4Icon />}
          className={classes.darkModeSwitch}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
