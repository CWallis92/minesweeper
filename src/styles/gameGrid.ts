// https://mui.com/material-ui/guides/interoperability/#styled-components

import { Button, styled } from "@mui/material";

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    gridButton: true;
  }
}

export const GameButton = styled(Button)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  width: 30,
  height: 30,
}));
