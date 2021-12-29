import './index.scss'
import ReactDOM from 'react-dom'
import App from './component/App'

import { ApolloProvider } from '@apollo/client'

// Inputs stop floating wherever the hell you are...
import 'bootstrap/dist/css/bootstrap.css'

// Router
import { BrowserRouter as Router } from 'react-router-dom'

//Redux
import { store } from './store/index'
import { Provider } from 'react-redux'
import { apolloClient } from './graphql'

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </Provider>,

  document.getElementById('root')
)
