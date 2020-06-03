export const getDefaultCells = () => {
  const defaultCells = [];

  for (let i = 0; i < 100; i++) {
    defaultCells[i] = {
      state: 'covered', // uncovered, covered, flagged
      mine: Math.random() <= 0.15 ? true : false,
    }
  }

  defaultCells[0] = {
    ...defaultCells[0],
    mine: true
  }

  return defaultCells
}
