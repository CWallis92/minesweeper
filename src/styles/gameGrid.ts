import { Box, styled } from "@mui/material";

// https://mui.com/material-ui/guides/interoperability/#styled-components

export const GameButton = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  width: 30,
  height: 30,
  border: "1px solid grey",
}));
