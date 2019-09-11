import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import ReactFilestack from 'filestack-react'
import Auth from '../../lib/Auth'

const FILESTACK_KEY = process.env.FILESTACK_KEY

const imageUpload = {
  accept: 'image/*',
  options: {
    resize: {
      width: 100
    }
  },
  transformations: {
    crop: false,
    circle: false,
    rotate: false
  }
}

class CompanyRegister extends React.Component {

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

  handleUploadImages(e) {
    const formData = {...this.state.formData, logo: e.filesUploaded[0].url}
    this.setState({ formData })
    document.getElementById('progress').innerHTML = 'image chosen'
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/companies/', this.state.formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        this.props.history.push('/login')
      })
      .catch(err => this.setState({ errors: err.response.data }))
  }

  componentDidMount() {
    document.documentElement.classList.remove('has-navbar-fixed-top')
  }

  componentWillUnmount() {
    document.documentElement.classList.add('has-navbar-fixed-top')
  }

  render() {
    return (
      <section className="hero has-background">
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
                <label className="label">Company Name</label>
                <div className="control">
                  <input
                    className="input"
                    type= "text"
                    name="name"
                    placeholder="eg: Tech Company"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
              </div>

              <div className="field">
                <label className="label">Logo</label>
                <div className="Dropzone upload-box">
                  <div className="uploadbutton">
                    <ReactFilestack
                      mode="transform"
                      apikey={FILESTACK_KEY}
                      buttonClass="button"
                      options={imageUpload}
                      onSuccess={(e) => this.handleUploadImages(e)}
                      preload={true}
                    />
                    <div><span id="progress"></span></div>
                  </div>
                  {this.state.errors.logo && <small className="help is-danger">{this.state.errors.logo}</small>}
                </div>

                <div className="field">
                  <label className="label">Location</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="location"
                      placeholder="eg: London, UK"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.location && <small className="help is-danger">{this.state.errors.location}</small>}
                </div>

                <div className="field">
                  <label className="label">Industry</label>
                  <div className="control">
                    <select className="control" name="industry" onChange={this.handleChange}>
                      <option value="Consumer Goods and Services">Consumer Goods and Services</option>
                      <option value="B2B Software and Services">B2B Software and Services</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Consumer Media">Consumer Media</option>
                      <option value="Government">Government</option>
                      <option value="Financial Technology and Services">Financial Technology and Services</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Energy and Environment">Energy and Environment</option>
                      <option value="Real Estate and Construction">Real Estate and Construction</option>
                      <option value="Aerospace">Aerospace</option>
                    </select>
                  </div>
                  {this.state.errors.industry && <small className="help is-danger">{this.state.errors.industry}</small>}
                </div>

                <div className="field">
                  <label className="label">Description</label>
                  <div className="control">
                    <textarea
                      className="input textarea"
                      type="textarea"
                      name="description"
                      placeholder="eg: We build amazing websites for our clients since 1995."
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.description && <small className="help is-danger">{this.state.errors.description}</small>}
                </div>

                <div className="field">
                  <label className="label">Website</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="website"
                      placeholder="eg: thetechcompany.com"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.website && <small className="help is-danger">{this.state.errors.website}</small>}
                </div>

                <div className="field">
                  <label className="label">Pro women achievements</label>
                  <div className="control">
                    <textarea
                      className="input textarea"
                      type="text"
                      name="women_achievements"
                      placeholder="eg: EDGE Certification (2017), NES (2018) & Official Sponsor of Women in Tech London."
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.women_achievements && <small className="help is-danger">{this.state.errors.women_achievements}</small>}
                </div>

                <div className="field">
                  <label className="label">Number of employees</label>
                  <div className="control">
                    <input
                      className="input"
                      type="number"
                      name="employees"
                      placeholder="530"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.employees && <small className="help is-danger">{this.state.errors.employees}</small>}
                </div>

                <div className="field">
                  <label className="label">Percentaje of women employees</label>
                  <div className="control">
                    <input
                      className="input"
                      type="number"
                      name="women_employees_percentaje"
                      placeholder="30"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.women_employees_percentaje && <small className="help is-danger">{this.state.errors.women_employees_percentaje}</small>}
                </div>
                <div className="has-text-centered">
                  <button className="button is-danger is-outlined" onClick={this.handleSubmit}>Register</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

    )
  }
}

export default withRouter(CompanyRegister)
