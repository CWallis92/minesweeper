import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "calc(100vh - 64px)",
    textAlign: "center",
  },
  paper: {
    margin: "auto",
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
}));

export default useStyles;
