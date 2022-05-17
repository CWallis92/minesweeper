import React, { useEffect, useState } from "react";

import {
  ButtonsDiv,
  StyledTableCell,
  StyledTableRow,
} from "../styles/hiScores";
import {
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const HiScores = (): React.ReactElement => {
  // TODO: API to DB
  const fullScores: Record<Difficulty, Score[]> = {
    easy: [
      {
        name: "Chris",
        time: 10,
      },
      {
        name: "Heather",
        time: 12,
      },
    ],
    medium: [
      {
        name: "Chris",
        time: 40,
      },
    ],
    hard: [
      {
        name: "Chris",
        time: 180,
      },
    ],
  };

  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    if (fullScores.hasOwnProperty(difficulty)) {
      setScores(fullScores[difficulty]);
    }
  }, [difficulty]);

  return (
    <>
      <Typography variant="h5" align="center" sx={{ marginTop: "2em" }}>
        Hi-Scores
      </Typography>
      <ButtonsDiv>
        <ButtonGroup variant="contained" color="secondary">
          <Button
            disabled={difficulty === "easy"}
            onClick={() => setDifficulty("easy")}
          >
            Easy
          </Button>
          <Button
            disabled={difficulty === "medium"}
            onClick={() => setDifficulty("medium")}
          >
            Medium
          </Button>
          <Button
            disabled={difficulty === "hard"}
            onClick={() => setDifficulty("hard")}
          >
            Hard
          </Button>
        </ButtonGroup>
      </ButtonsDiv>
      <TableContainer component={Paper}>
        <Table aria-label="Hi-scores">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Time</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scores.map(({ name, time }, index) => {
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{time}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default HiScores;
