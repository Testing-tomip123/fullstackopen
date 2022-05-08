import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  return (
    <div>
      <button onClick={() => store.dispatch({ type: 'GOOD' })}>Good</button>
      <button onClick={() => store.dispatch({ type: 'OK' })}>OK</button>
      <button onClick={() => store.dispatch({ type: 'BAD' })}>Bad</button>
      <button onClick={() => store.dispatch({ type: 'ZERO' })}>Reset</button>
      <div>
        <p>Good: {store.getState().good}</p>
        <p>OK: {store.getState().ok}</p>
        <p>Bad: {store.getState().bad}</p>
      </div>
    </div>
  )
}

const render = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(<App />)
}

render()
store.subscribe(render)

