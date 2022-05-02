// https://bareynol.github.io/mui-theme-creator/

import { createContext } from "react";
import { createTheme, PaletteMode } from "@mui/material";
import { grey, indigo, red } from "@mui/material/colors";

declare module "@mui/material" {
  interface PaletteOptions {
    gridButton?: PaletteOptions["primary"];
  }
}

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

const modeTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: indigo,
      secondary: red,
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
  });

export default modeTheme;
