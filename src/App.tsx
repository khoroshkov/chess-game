import React, { useState, useEffect } from 'react'
import './App.css'
import { BoardComponent, LostFigures, Timer } from './components'
import { Board } from './models/Board'
import { Colors } from './models/Colors'
import { Player } from './models/Player'
import { numbersRow } from './constants/constants'

function App() {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer, setWhitePlayer] = useState<Player>(
    new Player(Colors.WHITE)
  )
  const [blackPlayer, setBlackPlayer] = useState<Player>(
    new Player(Colors.BLACK)
  )
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  function restart() {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
    setCurrentPlayer(whitePlayer)
  }

  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    )
  }

  useEffect(() => {
    restart()
  }, [])

  return (
    <div className="app">
      <Timer currentPlayer={currentPlayer} restart={restart} />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div className="numbersContainer">
        {numbersRow.map((number) => (
          <div key={number} className={['cell', 'numbers'].join(' ')}>
            {number}
          </div>
        ))}
      </div>
      <div>
        <LostFigures title="Black figures" figures={board.lostBlackFigures} />
        <LostFigures title="White figures" figures={board.lostWhiteFigures} />
      </div>
    </div>
  )
}

export default App
