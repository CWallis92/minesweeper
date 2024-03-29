// https://bareynol.github.io/mui-theme-creator/

import { createTheme, PaletteMode } from "@mui/material";
import "@mui/material/Button";
import "@mui/material/TextField";
import { blue, blueGrey, grey, indigo, purple } from "@mui/material/colors";

declare module "@mui/material" {
  interface PaletteOptions {
    gridButton: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    gridButton: true;
  }
}

const modeTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: mode === "light" ? blue : indigo,
      secondary: blueGrey,
      gridButton: {
        main: grey[500],
        dark: grey[600],
      },
      ...(mode === "light"
        ? {
            background: {
              default: "#f5f5f5",
              paper: "#fff",
            },
          }
        : {
            background: {
              default: "#303030",
              paper: "#424242",
            },
          }),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            minWidth: 0,
          },
        },
      },
    },
    typography: {
      fontFamily: "Oxanium",
    },
  });

export default modeTheme;
