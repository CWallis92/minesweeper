import { createContext } from "react";
import { createTheme, PaletteMode } from "@mui/material";
import { blue, purple } from "@mui/material/colors";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

const modeTheme = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: blue[800],
      },
      ...(mode === "light" ? {} : {}),
    },
  });
};

export default modeTheme;
