import React from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../common/Navbar.js'

class About extends React.Component {


  render() {
    return (
      <section className="hero is-fullheight-with-navbar has-background">
        <Navbar/>
        <img alt="About image" className="hero-background is-transparent" src="https://imgur.com/rcF59mA.jpg" />
        <div className="hero-body">
          <div className="container">
            <div className="logoicon">
              <h1 className="title is-2" id="ada">
                ADA
              </h1>
              <h2 className="subtitle is-4">
                Women 3.0
              </h2>
            </div>
            <div className="columns about">
              <div className="column is-one-third">
                <h2 className="subtitle is-6">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </h2>
              </div>
              <div className="column is-one-third">
                <h2 className="subtitle is-6">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </h2>
              </div>
              <div className="column is-one-third">
                <h2 className="subtitle is-6">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default About
