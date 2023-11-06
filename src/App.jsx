import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkEndGame, checkWinner } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { resetGameStorage, saveGameToStorage } from './storage'
import { Brand } from './components/Brand'

function App() {
  const [board, setBoard] = useState(() => {
    // leer del localstorage es lento sincrono y bloquante, debe ir dentro de este estado porque si lo ponemos fuera es mala practica, ya que en cada render leeria el localstorage
    // solo necesito leerlo cuando inicializa el estado
    const boardFromStorage = window.localStorage.getItem('board')

    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    // mira si es null o undefined
    return turnFromStorage ?? TURNS.X
    // mira si es falsy
    // return turnFromStorage || TURNS.X;
  })

  // null es que no hay ganador, false es que hay empate
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    // no actualizamos esta posición, si ya tiene algo
    if (board[index] || winner) return

    // actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // cambiar turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // guardar partida en el localStorage
    saveGameToStorage({ board: newBoard, turn: newTurn })

    // revisar si hay ganador
    // la actualización de los estado es asíncrono en react
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      // setWinner((prevWinner) => {
      //   console.log(
      //     `El ganador es ${newWinner}, el anterior era ${prevWinner}`
      //   );
      //   return setWinner;
      // });

      // alert(`El ganador es ${newWinner}`)
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className='main'>
      <div className='board'>
        <h1>Tic tac toe</h1>
        <button onClick={resetGame}>Reset</button>
        <section className='game'>
          {board.map((_, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          })}
        </section>
        <section className='turn'>
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>
        <WinnerModal resetGame={resetGame} winner={winner} />
      </div>

      <Brand />
    </main>
  )
}

export default App
