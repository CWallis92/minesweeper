import { createContext } from "react";
import { PaletteMode } from "@mui/material";
import { blue, purple } from "@mui/material/colors";

export const ColorModeContext = createContext({
  currColor: "light",
  toggleColorMode: () => {},
});

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: blue,
        }
      : {
          // palette values for dark mode
          primary: purple,
        }),
  },
});

export default getDesignTokens;
