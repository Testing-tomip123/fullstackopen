import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'

const rootElement = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  )
}

rootElement()
store.subscribe(rootElement)
