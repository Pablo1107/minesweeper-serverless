import React from 'react';
import PropTypes from 'prop-types'
import useCells from '../../hooks/useCells'
import { Wrapper, Code, CellsWrapper, Cell } from './components/Styled'

const hasUncoveredMine = (cell) => {
  return cell.state === 'uncovered' && cell.mine
}

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
      </CellsWrapper>
    </Wrapper>
  )
}

Cells.propTypes = {
  initialCells: PropTypes.array.isRequired,
}

export default Cells
