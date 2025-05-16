export const GAME_ID_LENGTH = 6;
export const PLAYER_TOKEN_LENGTH = 10;
export const MAX_POINTS = 100;

export const generateId = (length): number => {
  return Math.floor(Math.random() * Math.pow(10, length));
};
