export const adjacentCells = (cell, cells) => {
  const adjCells = []

  const { x, y } = cell
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      const adjCell = getCell(i, j, cells)
      if (cell === adjCell) continue
      if (!adjCell) continue

      adjCells.push(adjCell)
    }
  }
  return adjCells
}

export const getCell = (x, y, cells) => {
  if (x < 0 || y < 0) return null
  return cells[y * 10 + x]
}

export const getDefaultCells = () => {
  const defaultCells = [];

  const n = 10
  const m = 10

  for (let i = 0; i < n * m; i++) {
    const y = Math.floor(i / n)
    const x = i - y * n
    defaultCells[i] = {
      x, y,
      state: 'covered', // uncovered, covered, flagged
      mine: Math.random() <= 0.15 ? true : false
    }
  }

  defaultCells[0] = {
    ...defaultCells[0],
    mine: true
  }

  defaultCells.filter((c, i) => !c.mine).forEach(cell => {
    cell.adjacentMines = adjacentCells(cell, defaultCells).filter(c => c.mine).length
  })

  return defaultCells
}
