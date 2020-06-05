import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: #1c1824;
  color: #fafafa;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 100%;

  > * {
    margin-bottom: 10px;
  }
`
export const Code = styled.div`
  flex-grow: 1;
  margin-right: 20px;
  padding: 20px;
  background-color: #262938;
  border-radius: 10px;
  color: #d0d0d0;
  font-family: monospace;
  overflow-y: auto;
  max-height: inherit;

  h3 {
    margin-top: 0;
  }
`

export const CellsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr)
`

export const Cell = styled.div`
  width: 20px;
  height: 20px;
  background-color: #5b9af8;
  border: 1px solid black;
  cursor: pointer;
  text-align: center;

  ${props => props.uncovered && `
    background-color: #262938;
  `}

  ${props => props.uncovered && props.hasMine && `
    background-color: red;
  `}
`
