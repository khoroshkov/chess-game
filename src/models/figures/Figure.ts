import { v4 as uuidv4 } from 'uuid'

import { Colors } from '../Colors'
import logo from '../assets/black-king.png'
import { Cell } from '../Cell'

export enum FigureNames {
  FIGURE = 'figure',
  KING = 'king',
  KNIGHT = 'knight',
  PAWN = 'pawn',
  QUEEN = 'queen',
  ROOK = 'rook',
  BISHOP = 'bishop'
}

export class Figure {
  color: Colors
  logo: typeof logo | null
  cell: Cell
  name: FigureNames
  id: string

  constructor(color: Colors, cell: Cell) {
    this.color = color
    this.cell = cell
    this.cell.figure = this
    this.logo = null
    this.id = uuidv4()
    this.name = FigureNames.FIGURE
  }

  canMove(target: Cell): boolean {
    if (
      target.figure?.color === this.color ||
      target.figure?.name === FigureNames.KING
    ) {
      return false
    }
    return true
  }

  moveFigure(target: Cell) {}
}
