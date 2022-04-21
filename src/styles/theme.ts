import { createTheme } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

export const lightTheme = createTheme({
  palette: {
    type: "light",
    primary: blue,
  },
});

export const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});
