/** @format */

import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import App from './App'
import client from './api/client'

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)
