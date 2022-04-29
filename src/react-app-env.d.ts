/// <reference types="react-scripts" />

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

interface Square {
  state: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | "x" | null;
  revealed: boolean;
}
