import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
const animatedComponents = makeAnimated()

const roles = [
  { value: 'Frontend', label: 'Frontend' },
  { value: 'Backend', label: 'Backend' },
  { value: 'Full Stack', label: 'Full Stack' },
  { value: 'Android', label: 'Android' },
  { value: 'Data Science', label: 'Data Science' },
  { value: 'Devops', label: 'Devops' },
  { value: 'Embedded Systems', label: 'Embedded Systems' },
  { value: 'iOS', label: 'iOS' },
  { value: 'Machine Learning', label: 'Machine Learning' },
  { value: 'Robotics', label: 'Robotics' }
]

class UserRegister extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value}
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState( { formData, errors })

  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/applicants', this.state.formData)
      .then(res => {
        this.props.history.push('/')
      })
      .catch(err => this.setState({ errors: err.response.data.errors}))
  }

  render() {
    return (
      <section className="hero is-large has-background">
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
              <h2 className="subtitle is-4 has-text-centered">Register - Step 2 of 2</h2>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className="input"
                    name="username"
                    type="username"
                    placeholder="eg: ada.lovelace"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.username && <small className="help is-danger">{this.state.errors.username}</small>}
              </div>

              <div className="field">
                <label className="label">First name</label>
                <div className="control">
                  <input
                    className="input"
                    type= "text"
                    name="firstname"
                    placeholder="eg: Ada"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.firstname && <small className="help is-danger">{this.state.errors.firstname}</small>}
              </div>

              <div className="field">
                <label className="label">Last name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="lastname"
                    placeholder="eg: Lovelace"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.lastname && <small className="help is-danger">{this.state.errors.lastname}</small>}
              </div>

              <div className="field">
                <label className="label">Picture</label>
                <div className="control">
                  <input
                    className="input"
                    type="image"
                    name="image"
                    placeholder="eg: Ada-Lovelace-Profile.jpg"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.image && <small className="help is-danger">{this.state.errors.image}</small>}
              </div>

              <div className="field">
                <label className="label">Headline</label>
                <div className="control textarea">
                  <input
                    className="input"
                    type="text"
                    name="headline"
                    placeholder="eg: I love to write machine algorythms, some know me as the mother of computer programming"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.headline && <small className="help is-danger">{this.state.errors.headline}</small>}
              </div>

              <div className="field">
                <label className="label">Select the roles you are interested in:</label>
                <div className="control">
                  <Select
                    isMulti
                    isSearchable
                    name="roles"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    onChange={this.handleChange}
                    options={roles}
                  />
                </div>
                {this.state.errors.industry && <small className="help is-danger">{this.state.errors.industry}</small>}
              </div>

              <div className="field">
                <label className="label">LinkedIn</label>
                <div className="control">
                  <input
                    className="input"
                    type="url"
                    name="linkedin"
                    placeholder="eg: https://www.linkedin.com/adalovelace/"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.linkedin && <small className="help is-danger">{this.state.errors.linkedin}</small>}
              </div>

              <div className="field">
                <label className="label">Portfolio</label>
                <div className="control">
                  <input
                    className="input"
                    type="url"
                    name="portfolio"
                    placeholder="eg: motherofcomputerprogramming.com"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.portfolio && <small className="help is-danger">{this.state.errors.portfolio}</small>}
              </div>

              <div className="field">
                <label className="label">Github</label>
                <div className="control">
                  <input
                    className="input"
                    type="url"
                    name="github"
                    placeholder="eg: https://github.com/AdaLovelace"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.github && <small className="help is-danger">{this.state.errors.github}</small>}
              </div>

              <div className="field">
                <label className="label">CV</label>
                <div className="control">
                  <input
                    className="input"
                    type="file"
                    name="cv"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.cv && <small className="help is-danger">{this.state.errors.cv}</small>}
              </div>

              <div className="field">
                <label className="label">Technologies:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="skills"
                    placeholder="30"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.skills && <small className="help is-danger">{this.state.errors.skills}</small>}
              </div>
              <div className="has-text-centered">
                <button className="button is-danger is-outlined" onClick={this.handleSubmit}>Register</button>
              </div>
            </form>
          </div>
        </div>
      </section>

    )
  }
}

export default withRouter(UserRegister)
