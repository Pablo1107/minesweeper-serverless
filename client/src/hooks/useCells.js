import { useState } from 'react'

export default function useCells(defaultValue) {
  const [cells, setCells] = useState(defaultValue);
  const [gameOver, setGameOver] = useState(false);

  const handleChange = (i) => (e) => {
    e.preventDefault()

    const { type } = e
    const newCells = [...cells]

    if (type === 'click') {
      if (cells[i].mine) {
        alert('Game over')
        setGameOver(true)
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
    setCells(newCells)
  }

  return [cells, gameOver, handleChange]
}
