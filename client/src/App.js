import React, { useEffect } from 'react';
import useCells from './hooks/useCells'
import { Wrapper, Code, Cells, Cell } from './components/Styled'
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL

const defaultCells = [];

for (let i = 0; i < 100; i++) {
  defaultCells[i] = {
    state: 'covered', // uncovered, covered, flagged
    mine: Math.random() <= 0.15 ? true : false,
  }
}

const hasUncoveredMine = (cell) => {
  return cell.state === 'uncovered' && cell.mine
}

function App() {
  defaultCells[0] = {
    ...defaultCells[0],
    mine: true
  }
  const [cells, gameOver, handleChange] = useCells(defaultCells)

  useEffect(() => {
    (async () => {
      try {
        const { data: { game } } = await axios.post(`/game`, {
          cells
        })

        console.log(game)
        window.history.pushState(null, null, `/${game}`)
      } catch (err) {
        console.log(err)
      }
    })()
  })

  return (
    <Wrapper>
      <Code>
        {JSON.stringify(cells)}
      </Code>
      <Cells>
        {cells.map((cell, i) =>
          <Cell key={i}
            index={i} uncoveredMine={hasUncoveredMine(cell)}
            onClick={handleChange(i)}
            onContextMenu={handleChange(i)}
          >
            {{
              'covered': '',
              'uncovered': 'cc',
              'flagged': 'f',
            }[cell.state]}
          </Cell>
        )}
      </Cells>
      {gameOver && <span>Game Over!</span>}
    </Wrapper>
  );
}

export default App;
