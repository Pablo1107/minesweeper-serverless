import { useState, useEffect } from 'react'
import { getRemoteCells, setRemoteCells, createGame } from '../services/api'
import { getDefaultCells } from '../helpers/cells'

export default function useRemoteCells(
  defaults = {
    n: 10, m: 10
  }
) {
  const [cells, setCells] = useState(null)
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState(defaults)


  useEffect(() => {
    (async () => {
      const { n, m } = settings
      setLoading(true)

      try {
        const game = window.location.pathname.substr(1)
        if (game) {
          let { cells, settings } = await getRemoteCells(game)

          if (!cells) {
            console.log('No remote cells found, creating default cells...')
            cells = getDefaultCells(n, m)
            await setRemoteCells(cells, game, { n, m })
          }

          setCells(cells)
          setSettings(settings || { n, m })
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.n, settings.m])

  return [cells, loading, settings, setSettings]
}
