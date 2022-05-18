import React from "react";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
  const vote = (anecdote) => {
    store.dispatch(voteAnecdote(anecdote.id))
    store.dispatch(showNotification(`you voted '${anecdote.content}'`))
  }

  const anecdotes = store.getState().anecdotes
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(store.getState().filter.toLowerCase())).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList