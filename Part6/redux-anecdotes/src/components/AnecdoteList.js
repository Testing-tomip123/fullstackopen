import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div style={ { margin: 10,
      padding: 10,
      border: "1px solid #ccc",
      borderRadius: 5,
      backgroundColor: "#f0f0f0" } }>
      <div style={ { fontWeight: "bold", marginBottom: 10 } }>
        {anecdote.content}
      </div>
      <div>
        Has {anecdote.votes} votes
      </div>
        <button style={ { 
          marginTop: 10,
          padding: 10, 
          border: "1px solid #ccc", 
          borderRadius: 5, 
          backgroundColor: "#f0f0f0" } } 
          onClick={() => handleVote({ id: anecdote.id, name: anecdote.content })}>vote</button>
    </div>
  )
}
    
const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter)
  const anecdotes = useSelector((state) => 
    state.anecdotes.filter((anecdote) => anecdote.content.includes(filter))
  )

  const handleVote = ({ id, name }) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`You voted '${name}'`, 5000))
  }

  const sortByVotes = (a, b) => b.votes - a.votes

  return (
    <div>
      {anecdotes.sort(sortByVotes).map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={handleVote} />
      ))}
    </div>
  )
}

export default AnecdoteList