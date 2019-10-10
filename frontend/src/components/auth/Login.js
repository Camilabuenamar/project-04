import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import Navbar from '../common/Navbar.js'
import { withRouter } from 'react-router-dom'

class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      error: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const formData = {...this.state.formData, [e.target.name]: e.target.value}
    this.setState({ formData, error: ''})
  }


  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/login/', this.state.formData)
      .then(res => {
        Auth.setToken(res.data.token)
        this.props.history.push('/offers')
      })
      .catch(() => {
        Auth.removeToken()
        this.setState({ error: 'Invalid credentials' })
      })
  }


  render() {
    return (
      <section className="hero is-fullheight-with-navbar has-background">
        <Navbar/>
        <img alt="Home image" className="hero-background is-transparent" src="https://i.imgur.com/UHlP7Fj.jpg" />
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
            <form className="form" onSubmit={this.handleSubmit}>
              <h2 className="subtitle is-4 has-text-centered">Login</h2>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="username"
                    placeholder="eg: ada.lovelace"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="password"
                    placeholder="eg: ••••••••"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.error && <small className="help is-danger">{this.state.error}</small>}
              </div>

              <button className="button is-danger is-outlined">Submit</button>
            </form>
          </div>
        </div>
      </section>

    )
  }
}

export default withRouter(Login)
