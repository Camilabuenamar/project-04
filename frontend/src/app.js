import React from 'react'
import ReactDOM from 'react-dom'
import './style.scss'
import { HashRouter, Route , Switch} from 'react-router-dom'

import Home from './components/pages/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import CompanyRegister from './components/auth/CompanyRegister'
import UserRegister from './components/auth/UserRegister'
import OfferIndex from './components/pages/OfferIndex'
import CompanyIndex from './components/pages/CompanyIndex'
import UserProfile from './components/pages/UserProfile'
import CompanyProfile from './components/pages/CompanyProfile'

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/offers" component={OfferIndex} />
          <Route path="/companies" component={CompanyIndex} />
          <Route path="/userprofile" component={UserProfile} />
          <Route path="/companyprofile" component={CompanyProfile} />
          <Route path="/login" component={Login} />
          <Route path="/companyregistration" component={CompanyRegister} />
          <Route path="/userregistration" component={UserRegister} />
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
