import { createSlice } from "@reduxjs/toolkit"
import AnecdoteServices from "../services/anecdotes"

const initialState = []

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    setAnecdotes: (state, { payload }) => {
      state.push(...payload)
    },
    createAnecdotes: (state, { payload }) => {
      state.push(payload)
    },
    replaceAnecdote: (state, { payload }) => {
      state.map((anecdote) => {
        if (anecdote.id === payload.id) {
          anecdote.content = payload.content
          anecdote.votes = payload.votes
        }
        return anecdote
      })
    },
  },
})

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await AnecdoteServices.getAll()
  dispatch(setAnecdotes(anecdotes))
}

export const createAnecdote = (content) => async (dispatch) => {
  const anecdote = await AnecdoteServices.create(content)
  dispatch(createAnecdotes(anecdote))
}

export const voteAnecdote = (id) => async (dispatch, getState) => {
  const anecdote = getState().anecdotes.find((anecdote) => anecdote.id === id)
  const payload = {
    ...anecdote,
    votes: anecdote.votes + 1,
  }
  await AnecdoteServices.edit({ id, payload })
  dispatch(replaceAnecdote(payload))
}

export const { setAnecdotes, createAnecdotes, replaceAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
