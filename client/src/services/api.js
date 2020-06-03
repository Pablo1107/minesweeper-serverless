import axios from 'axios'
import { getDefaultCells } from '../helpers/cells'

export const getRemoteCells = async (game) => {
  try {
    const { data: { cells } } = await axios.get(`/game`, {
      params: {
        game
      }
    })

    return cells
  } catch (err) {
    console.log(err)
  }
}

export const setRemoteCells = async (cells, gameId) => {
  try {
    const { data: { game } } = await axios.post(`/game`, {
      game: gameId || undefined,
      cells
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

    console.log(game)
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

    console.log(data)
  } catch (err) {
    console.log(err)
  }
}
