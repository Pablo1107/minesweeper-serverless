import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: #1c1824;
  color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  > * {
    margin-bottom: 10px;
  }
`

export const Code = styled.div`
  margin: 50px;
  padding: 20px;
  background-color: #262938;
  border-radius: 10px;
  color: #d0d0d0;
  font-family: monospace;
`

export const Cells = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr)
`

export const Cell = styled.div`
  width: 20px;
  height: 20px;
  background-color: #5b9af8;
  border: 1px solid black;
  cursor: pointer;

  ${props => props.uncoveredMine && `
    background-color: red;
  `}
`
