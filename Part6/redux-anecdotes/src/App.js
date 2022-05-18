import React from "react"
import AnecdoteForm from "./components/AncedoteForm"
import AnecdoteList from "./components/AncedoteList"
import Notification from './components/Notification'
import Filter from "./components/Filter"

const App = (props) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter store={props.store} />
      {
        props.store.getState().notification
          ? <Notification store={props.store} />
          : null
      }
      <AnecdoteList store={props.store} />
      <AnecdoteForm store={props.store} />
    </div>
  )
}

export default App