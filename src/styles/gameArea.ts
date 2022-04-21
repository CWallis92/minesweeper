import { makeStyles } from "@material-ui/core";

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
