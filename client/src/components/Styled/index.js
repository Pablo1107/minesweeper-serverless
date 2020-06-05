import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: #1c1824;
  color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);
  padding: 50px;

  > * {
    margin-bottom: 10px;
  }
`

export const Code = styled.div`
  padding: 20px;
  background-color: #262938;
  border-radius: 10px;
  color: #d0d0d0;
  font-family: monospace;
  font-size: 8px;

  h3 {
    margin-top: 0;
  }
`
