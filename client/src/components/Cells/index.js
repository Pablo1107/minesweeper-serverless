import React from 'react';
import PropTypes from 'prop-types'
import useCells from '../../hooks/useCells'
import { Wrapper, Code, CellsWrapper, Cell } from './components/Styled'

function Cells({ initialCells }) {
  const [cells, gameOver, handleChange] = useCells(initialCells)

  if (gameOver) {
    return <div>Game Over!</div>
  }

  return (
    <Wrapper>
      <Code>
        <h3>Local Cells</h3>

        {JSON.stringify(cells)}
      </Code>
      <CellsWrapper>
        {cells.map((cell, i) =>
          <Cell key={i}
            index={i}
            uncovered={cell.state === 'uncovered'}
            hasMine={cell.mine}
            onClick={handleChange(i)}
            onContextMenu={handleChange(i)}
          >
            {{
              'covered': cell.mine ? 'M' : '',
              'uncovered': cell.adjacentMines > 0 && cell.adjacentMines,
              'flagged': 'f',
            }[cell.state]}
          </Cell>
        )}
      </CellsWrapper>
    </Wrapper>
  )
}

Cells.propTypes = {
  initialCells: PropTypes.array.isRequired,
}

export default Cells
