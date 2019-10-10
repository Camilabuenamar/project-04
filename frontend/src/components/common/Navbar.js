import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/Auth'

class Navbar extends React.Component {

  constructor() {
    super()
    this.state = {
      navbarOpen: false,
      tabSelected: false
    }

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.logout = this.logout.bind(this)
  }

  toggleNavbar() {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  logout() {
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

    const activeClass = (route) => {
      return this.props.location.pathname === route ? 'is-active' : null
    }

    return (
      <div>
        <nav className="navbar is-fixed-top is-light" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <div className="navbar-item">
              <Link to ="/" className="">
                <img src="https://imgur.com/CJhqZ4U.png" alt="Logo"/>
              </Link>
            </div>
            <a
              role="button"
              className={`navbar-burger burger ${this.state.navbarOpen ? 'is-active' : ''}`}
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

          <div id="navbarBasicExample" className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''}`}>
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
                <Link to="/about" className="has-text-danger navbar-item">
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
