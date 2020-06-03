import { useState } from 'react'
import useRemoteCells from './useRemoteCells'
import { setRemoteCells, deleteGame } from '../services/api';

export default function useCells(defaultValue) {
  const [cells, setCells] = useState(defaultValue);
  const [gameOver, setGameOver] = useState(false);
  useRemoteCells(cells, setCells)

  const handleChange = (i) => (e) => {
    e.preventDefault()

    const { type } = e
    const newCells = [...cells]
    const game = window.location.pathname.substr(1)

    if (type === 'click') {
      if (cells[i].mine) {
        alert('Game over')
        setGameOver(true)
        deleteGame(game)
      } 
      newCells[i] = {
        ...cells[i],
        state: 'uncovered'
      }
    } else if (type === 'contextmenu') {
      newCells[i] = {
        state: 'flagged'
      }
    }

    if (game) {
      setRemoteCells(newCells, game)
    } else {
      setRemoteCells(newCells)
    }
    setCells(newCells)
  }

  return [cells, gameOver, handleChange]
}
