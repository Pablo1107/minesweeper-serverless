import { useState } from 'react'

export default function useSettings(
  defaults = {
    n: 10, m: 10
  },
  callback
) {
  const [inputs, setInputs] = useState({
    n: defaults.n || 10,
    m: defaults.m || 10,
  })

  const handleSettingsChange = (event) => {
    if (event) {
      event.preventDefault()
      if (callback) callback(inputs)
    }
  }

  const handleInputChange = (event) => {
    const { target: { name, value } } = event
    event.persist()
    console.log(value)
    setInputs(inputs => ({
      ...inputs,
      [name]: parseInt(value)
    }))
  }

  return [
    inputs,
    handleInputChange,
    handleSettingsChange,
  ]
}
