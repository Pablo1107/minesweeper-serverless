import React, { useState } from 'react';
import axios from 'axios';
import useRemoteCells from './hooks/useRemoteCells'
import { Wrapper, Code } from './components/Styled'
import Cells from './components/Cells'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

const hasUncoveredMine = (cell) => {
  return cell.state === 'uncovered' && cell.mine
}

function App() {
  const [remoteCells, loading] = useRemoteCells()
  const [localCells, setCells] = useState(null)

  if (loading) {
    return (
      <Wrapper>Loading</Wrapper>
    )
  }

  if (!remoteCells) {
    return (
      <Wrapper>No remote cells</Wrapper>
    )
  }

  return (
    <Wrapper>
      <Code>
        <h3>Remote Cells:</h3>

        {JSON.stringify(remoteCells)}
      </Code>
      <Cells initialCells={remoteCells} />
    </Wrapper>
  );
}

export default App;
