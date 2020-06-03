import { useState, useEffect } from 'react'
import axios from 'axios'
import { getRemoteCells, setRemoteCells, createGame } from '../services/api'
import { getDefaultCells } from '../helpers/cells'

export default function useRemoteCells() {
  const [cells, setCells] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const game = window.location.pathname.substr(1)
        if (game) {
          let cells = await getRemoteCells(game)

          if (!cells) {
            console.log('No remote cells found, creating default cells...')
            cells = getDefaultCells()
            await setRemoteCells(cells, game)
          }

          setCells(cells)
          setLoading(false)
        } else {
          const { game, cells } = await createGame()
          window.history.pushState(null, null, `/${game}`)
          setCells(cells)
          setLoading(false)
        }
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  return [cells, loading]
}
