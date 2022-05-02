interface Square {
  value: number | "x" | null;
  revealed: boolean;
  state?: "flagged" | "unknown" | null;
  losingSquare?: boolean;
}

interface GameState {
  started: boolean;
  ended: boolean;
  won: boolean;
  lost: boolean;
  flagsRemaining: number;
}
