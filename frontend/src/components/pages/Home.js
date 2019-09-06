import React from 'react'
import {Link} from 'react-router-dom'

class Home extends React.Component {
  render() {
    return (
      <section className="hero is-large has-background">
        <img alt="Home image" className="hero-background is-transparent" src="https://i.imgur.com/UHlP7Fj.jpg" />
        <div className="hero-body">
          <div className="container">
            <div className="logo">
              <h1 className="title is-1" id="ada">
                ADA
              </h1>
              <h2 className="subtitle is-3">
                Women 3.0
              </h2>
            </div>
            <div className="buttons" id="home-buttons">
              <Link to ="/login"><a className="button is-danger is-outlined" id="login-button">Login</a></Link>
              <Link to ="/register"><a className="button is-danger is-outlined" id="register-button">Register</a></Link>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Home
