// https://bareynol.github.io/mui-theme-creator/

import { createContext } from "react";
import { createTheme, PaletteMode } from "@mui/material";
import { blue, grey, purple } from "@mui/material/colors";

declare module "@mui/material" {
  interface PaletteOptions {
    gridButton: PaletteOptions["primary"];
  }
}

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

const modeTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      gridButton: {
        main: grey[500],
      },
      primary: {
        main: blue[800],
      },
      ...(mode === "light" ? {} : {}),
    },
  });

export default modeTheme;
