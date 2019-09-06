import React from 'react'
import { Link , withRouter} from 'react-router-dom'
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
    Auth.removeToken()
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ navbarOpen: false })
    }
  }

  render() {

    const activeclassNameName = (route) => {
      return this.props.location.pathname === route ? 'is-active' : null
    }

    return (
      <section className="hero is-small">
        <div className="hero-head">
        <nav className="navbar is-transparent is-fixed-top">
          <div className="navbar-brand">
            <div className="navbar-item">
              <h1 className="title" id="ada">
                ADA
              </h1>
              <h2 className="subtitle">
                Women 3.0
              </h2>
            </div>

            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarExampleTransparentExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarExampleTransparentExample" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item">
                Offers
              </a>

              <a className="navbar-item">
                Companies
              </a>

              <a className="navbar-item">
                Applicants
              </a>

              <a className="navbar-item">
                Resources
              </a>

            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <a className="button is-danger is-outlined">
                    <strong>Logout</strong>
                  </a>
                  <a className="button is-danger is-outlined">
                    profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
        </div>

      </section>
    )
  }

}

export default withRouter(Navbar)
