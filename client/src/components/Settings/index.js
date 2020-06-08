import React from 'react'
import PropTypes from 'prop-types'
import useSettings from '../../hooks/useSettings'
import { deleteGame } from '../../services/api'
import { Wrapper } from './components/Styled'

const Settings = ({ settings: defaults, onChange: handleSubmit }) => {
  const [settings, handleChange] = useSettings(defaults)

  const { n, m } = settings

  const handleSave = async () => {
    const game = window.location.pathname.substr(1)
    await deleteGame(game)
    handleSubmit({ n, m })
  }

  return (
    <Wrapper>
      <h2>Settings</h2>

      <label>Width: </label>
      <input type='number' name='n' value={n} onChange={handleChange} />

      <br />

      <label>Height: </label>
      <input type='number' name='m' value={m} onChange={handleChange} />

      <br />

      <button onClick={handleSave}>Save</button>
    </Wrapper>
  )
}

Settings.defaultProps = {
  onChange: () => {},
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  onChange: PropTypes.func,
}

export default Settings
