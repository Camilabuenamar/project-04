import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Navbar from '../common/Navbar.js'
import Auth from '../../lib/Auth'

class Register extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitCompany = this.handleSubmitCompany.bind(this)
    this.handleSubmitUser = this.handleSubmitUser.bind(this)
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value}
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState( { formData, errors })

  }

  handleSubmitCompany(e) {
    e.preventDefault()

    axios.post('/api/register/', this.state.formData)
      .then(res => {
        Auth.setToken(res.data.token)
        this.props.history.push('/companyregistration')
      })
      .catch(err => this.setState({ errors: err.response.data}))
  }

  handleSubmitUser(e) {
    e.preventDefault()

    axios.post('/api/register/', this.state.formData)
      .then(res => {
        Auth.setToken(res.data.token)
        this.props.history.push('/userregistration')
      })
      .catch(err => this.setState({ errors: err.response.data }))
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
            <form className="form">
              <h2 className="subtitle is-4 has-text-centered">Register - Step 1 of 2</h2>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className="input"
                    name="username"
                    type="text"
                    placeholder="eg: ada.lovelace"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.username && <small className="help is-danger">{this.state.errors.username}</small>}
              </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type= "email"
                    name="email"
                    placeholder="eg: ada.lovelace@techmail.org"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}
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
                {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}
              </div>

              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="password_confirmation"
                    placeholder="eg: ••••••••"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.passwordConfirmation && <small className="help is-danger">{this.state.errors.passwordConfirmation}</small>}
              </div>
              <div className="has-text-centered buttons" id="two-buttons">
                <button className="button is-danger is-outlined" id="first-button" onClick={this.handleSubmitCompany}>Sign up as Company</button>
                <button className="button is-danger is-outlined" id="second-button" onClick={this.handleSubmitUser}>Sign up as Applicant</button>
              </div>
            </form>
          </div>
        </div>
      </section>

    )
  }
}

export default withRouter(Register)
