import { createContext, Dispatch, SetStateAction } from "react";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const GameContext = createContext<{
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
}>({
  gameState: {
    difficulty: null,
    started: false,
    ended: false,
    won: false,
    lost: false,
  },
  setGameState: () => {},
});
