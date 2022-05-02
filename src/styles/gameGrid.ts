// https://mui.com/material-ui/guides/interoperability/#styled-components

import { Box, Button, styled } from "@mui/material";

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    gridButton: true;
  }
}

export const GameButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0.5),
  textAlign: "center",
  width: 30,
  height: 30,
  border: `1px solid ${theme.palette.background.default}`,
  borderRadius: 1,
}));

export const SquareValue = styled(Box)(({ theme }) => ({
  ...theme.typography.body1,
  padding: theme.spacing(0.5),
  textAlign: "center",
  border: `1px solid ${theme.palette.background.default}`,
  width: 30,
  height: 30,
}));
