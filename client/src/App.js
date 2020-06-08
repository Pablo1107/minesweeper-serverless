import React from 'react'
import axios from 'axios'
import useRemoteCells from './hooks/useRemoteCells'
import Context from './context'
import { Wrapper } from './components/Styled'
import Settings from './components/Settings'
import Cells from './components/Cells'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

function App() {
  const [remoteCells, loading, settings, setSettings] = useRemoteCells()

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
    <Context.Provider value={settings}>
      <Wrapper>
        <Settings settings={settings} onChange={setSettings} />
        <Cells initialCells={remoteCells} />
      </Wrapper>
    </Context.Provider>
  );
}

export default App;
