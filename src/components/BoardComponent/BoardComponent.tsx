import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Board } from '../../models/Board'
import { Cell } from '../../models/Cell'
import { Player } from '../../models/Player'
import { CellComponent } from '../CellComponent/CellComponent'
import { alphabetRow } from '../../constants/constants'

interface BoardProps {
  board: Board
  setBoard: (board: Board) => void
  currentPlayer: Player | null
  swapPlayer: () => void
}

export const BoardComponent: React.FC<BoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

  const onCellClick = useCallback(
    (cell: Cell) => {
      if (
        selectedCell &&
        selectedCell !== cell &&
        selectedCell.figure?.canMove(cell)
      ) {
        selectedCell.moveFigure(cell)
        setSelectedCell(null)
        swapPlayer()
      } else {
        if (cell.figure?.color === currentPlayer?.color) {
          setSelectedCell(cell)
        }
      }

      if (cell.x === selectedCell?.x && cell.y === selectedCell?.y) {
        setSelectedCell(null)
      }
    },
    [currentPlayer?.color, selectedCell, swapPlayer]
  )

  const updateBoard = useCallback(() => {
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
  }, [board, setBoard])

  const highlightCells = useCallback(() => {
    board.highlightCells(selectedCell)
    updateBoard()
  }, [board, selectedCell, updateBoard])

  useEffect(() => {
    highlightCells()
  }, [selectedCell])

  const horizontalCoordinates = useMemo(() => {
    return alphabetRow.map((letter) => (
      <div key={letter} className={['cell', 'alphabet'].join(' ')}>
        {letter}
      </div>
    ))
  }, [])

  return (
    <div>
      <h3>Current player: {currentPlayer?.color}</h3>
      <div className="board">
        {horizontalCoordinates}
        {board.cells.map((row: Cell[], index: number) => (
          <React.Fragment key={index}>
            {row.map((cell) => (
              <CellComponent
                click={onCellClick}
                cell={cell}
                key={cell.id}
                selected={
                  cell.x === selectedCell?.x && cell.y === selectedCell?.y
                }
              />
            ))}
          </React.Fragment>
        ))}
        {horizontalCoordinates}
      </div>
    </div>
  )
}
