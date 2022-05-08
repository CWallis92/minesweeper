interface Square {
  value: number | "x" | null;
  revealed: boolean;
  state?: "flagged" | "unknown" | null;
  losingSquare?: boolean;
}

type Difficulty = "easy" | "medium" | "hard";

interface GameNotStarted {
  difficulty: null;
  started: boolean;
  ended: boolean;
  won: boolean;
  lost: boolean;
}

interface GameInProgress {
  difficulty: Difficulty;
  started: boolean;
  ended: boolean;
  won: boolean;
  lost: boolean;
  rows: number;
  cols: number;
  mines: number;
  flagsRemaining: number;
}

type GameState = GameInProgress | GameNotStarted;
