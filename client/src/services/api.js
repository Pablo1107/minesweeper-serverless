import axios from 'axios'
import { getDefaultCells } from '../helpers/cells'

export const getRemoteCells = async (game) => {
  try {
    const { data: { cells, settings } } = await axios.get(`/game`, {
      params: {
        game
      }
    })

    return { cells, settings }
  } catch (err) {
    console.log(err)
    return {
      cells: null,
      settings: null,
    }
  }
}

export const setRemoteCells = async (cells, gameId, settings) => {
  console.log('Setting remote cells...')
  try {
    const { data: { game } } = await axios.post(`/game`, {
      game: gameId || undefined,
      cells,
      settings,
    })

    return game
  } catch (err) {
    console.log(err)
  }
}

export const createGame = async () => {
  try {
    const cells = getDefaultCells()
    const { data: { game } } = await axios.post(`/game`, {
      cells
    })

    return {
      game,
      cells
    }
  } catch (err) {
    console.log(err)
  }
}

export const deleteGame = async (game) => {
  try {
    const { data } = await axios.delete(`/game`, {
      params: {
        game
      }
    })

    console.info(data)
  } catch (err) {
    console.log(err)
  }
}
