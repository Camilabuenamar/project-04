import React from 'react'
import ReactDOM from 'react-dom'
import './style.scss'
import { HashRouter, Route , Switch} from 'react-router-dom'

import Home from './components/pages/Home'
import About from './components/pages/About'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import CompanyRegister from './components/auth/CompanyRegister'
import UserRegister from './components/auth/UserRegister'
import OfferIndex from './components/pages/OfferIndex'
import CompanyIndex from './components/pages/CompanyIndex'
import UserIndex from './components/pages/UserIndex'

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/applicants" component={UserIndex} />
          <Route path="/companies" component={CompanyIndex} />
          <Route path="/offers" component={OfferIndex} />
          <Route path="/userregistration" component={UserRegister} />
          <Route path="/companyregistration" component={CompanyRegister} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
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
