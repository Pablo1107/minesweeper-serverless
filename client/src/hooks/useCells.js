import { useState, useContext } from 'react'
import useRemoteCells from './useRemoteCells'
import { setRemoteCells, deleteGame } from '../services/api';
import { adjacentCells } from '../helpers/cells';
import Context from '../context'

export default function useCells(defaultValue) {
  const settings = useContext(Context)

  const [cells, setCells] = useState(defaultValue);
  const [gameOver, setGameOver] = useState(false);
  useRemoteCells(cells, setCells)

  const uncoverCell = (cell, newCells) => {
    cell.state = 'uncovered'
    if (cell.adjacentMines === 0 && !cell.mine) {
      console.log('Checking adjacent zeros')
      adjacentCells(cell, newCells, settings.n).forEach(adjCell => {
        if (adjCell.state === 'covered') {
          uncoverCell(adjCell, newCells)
        }
      })
    }
  }

  const handleChange = (i) => (e) => {
    e.preventDefault()

    const { type } = e
    const cell = cells[i]
    const newCells = [...cells]
    const game = window.location.pathname.substr(1)

    if (type === 'click') {
      if (cell.mine) {
        alert('Game over')
        setGameOver(true)
        deleteGame(game)
      }
      uncoverCell(cell, newCells)
    } else if (type === 'contextmenu') {
      newCells[i] = {
        state: 'flagged'
      }
    }

    if (!cell.mine) {
      setRemoteCells(newCells, game, settings)
      setCells(newCells)
    }
  }

  return [cells, gameOver, handleChange]
}
