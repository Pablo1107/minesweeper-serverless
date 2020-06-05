import React from 'react';
import axios from 'axios';
import useRemoteCells from './hooks/useRemoteCells'
import { Wrapper } from './components/Styled'
import Cells from './components/Cells'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

function App() {
  const [remoteCells, loading] = useRemoteCells()

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
      <Cells initialCells={remoteCells} />
    </Wrapper>
  );
}

export default App;
