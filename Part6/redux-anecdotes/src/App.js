import { useEffect } from "react"
import { initializeAnecdotes } from "./reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
import Anecdotes from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div style={{ margin: 10,
      padding: 10,
      border: "1px solid #ccc",
      borderRadius: 5,
      backgroundColor: "#f0f0f0" }}>

      <h2 style={{ margin: 10,
        padding: 10,
        border: "1px solid #ccc",
        borderRadius: 5,
        backgroundColor: "#f0f0f0",
        fontWeight: "bold" }}>Anecdotes</h2>
      <Notification />
      <Filter />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  )
}

export default App;