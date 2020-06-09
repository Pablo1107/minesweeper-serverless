export const adjacentCells = (cell, cells, n) => {
  const adjCells = []

  const { x, y } = cell
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      const adjCell = getCell(i, j, cells, n)
      if (cell === adjCell) continue
      if (!adjCell) continue

      adjCells.push(adjCell)
    }
  }
  return adjCells
}

export const getCell = (x, y, cells, n) => {
  if (x < 0 || y < 0) return null
  return cells[y * n + x]
}

export const getDefaultCells = (n = 10, m = 10) => {
  const defaultCells = [];

  for (let i = 0; i < n * m; i++) {
    const y = Math.floor(i / n)
    const x = i - y * n
    defaultCells[i] = {
      x, y,
      state: 'covered', // uncovered, covered, flagged
      mine: Math.random() <= 0.12 ? true : false
    }
  }

  defaultCells[0] = {
    ...defaultCells[0],
    mine: true
  }

  defaultCells.filter((c, i) => !c.mine).forEach(cell => {
    cell.adjacentMines = adjacentCells(cell, defaultCells, n).filter(c => c.mine).length
  })

  return defaultCells
}
