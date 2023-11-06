import { WINNER_COMBOS } from "../constants";

export const checkWinner = (boardToCheck) => {
  // revisamos todas las combinaciones ganadoras para ver si "x" u "o" gano
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  // si no hay ganador
  return null;
};


export const checkEndGame = (newBoard) => {
  // revisamos si hay un empate si no hay mas espacios vacíos en el tablero

  // newBoard = ["x", "o", "x", null, null, null, null, "o", null] cuando todas las posiciones sean diferentes a null, significa que ya están todas las jugadas listas
  // esta función me dice que si todas las posiciones del newBoard son diferentes a null devolverá true
  return newBoard.every((square) => square !== null)
}