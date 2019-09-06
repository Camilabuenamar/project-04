import React from 'react'
import ReactDOM from 'react-dom'
import './style.scss'
import { HashRouter, Route , Switch} from 'react-router-dom'

import Home from './components/pages/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path= "/" component={Home}/>
        </Switch>
      </HashRouter>
    )
  }



}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
