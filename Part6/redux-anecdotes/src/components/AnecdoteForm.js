import { useState } from "react"
import { connect } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = ({ createAnecdote, setNotification }) => {
  const [content, setContent] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    createAnecdote(content);
    setNotification(`You created '${content}'`, 5000);
    setContent("");
  }

  return (
    <div style={ { margin: 10,
      padding: 10,
      border: "1px solid #ccc",
      borderRadius: 5,
      backgroundColor: "#f0f0f0" } }>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Anecdote"
          />
        </div>
        <button style={ { marginTop: 10, marginBottom: 10, padding: 10 } }>
          Create
        </button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm

