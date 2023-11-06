import { Square } from "./Square";

export const WinnerModal = ({winner, resetGame}) => {
  if (winner === null) return null;
  
  const winnerText = winner === false ? "Empate" : "Ganó:"

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>
        <header className={winner ? "win" : "empato"}>{winner && <Square>{winner}</Square>}</header>
        <footer>
          <button onClick={resetGame}>Nuevo juego</button>
          
        </footer>

      </div>
    </section>
  );
};
