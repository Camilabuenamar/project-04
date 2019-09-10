import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/Auth'

class Navbar extends React.Component {

  constructor() {
    super()
    this.state = {
      navbarOpen: false
    }
    this.logout = this.logout.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  logout() {
    Auth.removeToken()
    this.props.history.push('/')
  }

  toggleNavbar() {
    this.setState({ navbarOpen: !this.state.navbarOpen})
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ navbarOpen: false})
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <div className="navbar-item">
              <h1 className="title" id="ada">
                ADA
              </h1>
              <h2 className="subtitle">
               Women 3.0
              </h2>
            </div>
            <a
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
              onClick={this.toggleNavbar}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <Link to="/offers" className="navbar-item">
                Offers
              </Link>
              <Link to="/companies" className="navbar-item">
                Companies
              </Link>
              <Link to="/applicants" className="navbar-item">
                Profiles
              </Link>
              <Link to="/offers" className="navbar-item">
                Resources
              </Link>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <Link to="/" className="navbar-item">
                About
                </Link>
                <div className="buttons">
                  {!Auth.isAuthenticated() &&
                    <Link to="/register" className="button is-danger is-outlined">
                      <strong>Sign up</strong>
                    </Link>
                  }
                  {!Auth.isAuthenticated() &&
                    <Link  to="/login" className="button is-danger is-outlined">
                      Log in
                    </Link>
                  }
                  {Auth.isAuthenticated() &&
                    <Link to='/' className="button is-danger is-outlined">
                      My Profile
                    </Link>
                  }
                  {/* {Auth.isAuthenticated() &&
                    <Link to={`/users/${Auth.getCurrentUserId()}`} className="button is-danger is-outlined">
                      My Profile
                    </Link>
                  } */}
                  {Auth.isAuthenticated() &&
                    <Link
                      to="/"
                      className="button is-danger"
                      onClick={this.logout}
                    >
                      Logout
                    </Link>
                  }
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default withRouter(Navbar)
