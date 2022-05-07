import { Button, styled } from "@mui/material";

export const Div = styled("div")(({ theme }) => ({
  margin: "0.5em auto",
  fontFamily: "Oxanium",
  fontSize: theme.typography.h5.fontSize,
  textAlign: "center",
}));

export const RestartButton = styled(Button)(({ theme }) => ({
  width: 45,
  height: 45,
  padding: "0.25em",
}));
