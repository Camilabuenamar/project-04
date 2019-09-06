import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
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
        Auth.setUser(res.data.user)
        this.props.history.push({
          pathname: '/',
          state: res.data.user
        })
      })
      .catch(() => {
        Auth.removeToken()
        Auth.removeUser()
        this.setState({ error: 'Invalid credentials' })
      })

  }

  render() {
    return (
      <section className="hero is-large has-background">
        <img alt="Home image" className="hero-background is-transparent" src="https://i.imgur.com/UHlP7Fj.jpg" />
        <div className="hero-body">
          <div className="container">
            <form className="loginform" onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    placeholder="eg: ada.lovelace@techmail.com"
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
