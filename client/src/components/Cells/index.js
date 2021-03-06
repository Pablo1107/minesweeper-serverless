import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import useCells from '../../hooks/useCells'
import { Wrapper, CellsWrapper, Cell } from './components/Styled'
import Context from '../../context'

function Cells({ initialCells }) {
  const { n, m } = useContext(Context)
  const [cells, playerWon, gameOver, handleChange] = useCells(initialCells)

  if (playerWon) {
    return <div>You Win!</div>
  }

  if (gameOver) {
    return <div>Game Over!</div>
  }

  return (
    <Wrapper>
      <CellsWrapper n={n} m={m}>
        {cells.map((cell, i) =>
          <Cell key={i}
            index={i}
            uncovered={cell.state === 'uncovered'}
            hasMine={cell.mine}
            onClick={handleChange(i)}
            onContextMenu={handleChange(i)}
          >
            {{
              'covered': '',
              'uncovered': cell.adjacentMines > 0 && cell.adjacentMines,
              'flagged': 'F',
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
