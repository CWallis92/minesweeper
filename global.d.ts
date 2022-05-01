interface Square {
  value: number | "x" | null;
  revealed: boolean;
  state?: "flagged" | "unknown" | null;
}
