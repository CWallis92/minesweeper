interface Square {
  value: number | "x" | null;
  revealed: boolean;
  state?: "flagged" | "unknown" | null;
  losingSquare?: boolean;
}

interface GameState {
  difficulty: "easy" | "medium" | "hard" | null;
  started: boolean;
  ended: boolean;
  won: boolean;
  lost: boolean;
  rows?: number;
  cols?: number;
  mines?: number;
  flagsRemaining?: number;
}
