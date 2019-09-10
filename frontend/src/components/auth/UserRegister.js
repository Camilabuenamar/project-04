import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
const animatedComponents = makeAnimated()
import ReactFilestack from 'filestack-react'

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

const skills = [
  { value: 'Javascript', label: 'Javascript' },
  { value: 'Python', label: 'Python' },
  { value: 'React', label: 'React' },
  { value: 'Java', label: 'Java' },
  { value: 'HTML', label: 'HTML' },
  { value: 'Git', label: 'Git' },
  { value: 'Node.js', label: 'Node.js' },
  { value: 'CSS', label: 'CSS' },
  { value: 'MySQL', label: 'MySQL' },
  { value: 'Amazon Web Services (AWS)', label: 'Robotics' },
  { value: 'C++', label: 'C++' },
  { value: 'PostgreSQL', label: 'PostgreSQL' },
  { value: 'Bash/Shell', label: 'Bash/Shell' },
  { value: 'Angular', label: 'Angular' },
  { value: 'React Native', label: 'React Native' },
  { value: 'MongoDB', label: 'MongoDB' },
  { value: 'Ruby on Rails', label: 'Ruby on Rails' },
  { value: 'PHP', label: 'PHP' },
  { value: 'C', label: 'C' }
]

const fileKEY = process.env.FILESTACK_KEY

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

  handleChangeSkills(selectedSkills) {
    const skills = selectedSkills.map(skills => skills.value)
    const formData = { ...this.state.formData, skills: skills}
    this.setState({ formData })
  }

  handleUploadImages(e) {
    const formData = {...this.state.formData, image: e.filesUploaded[0].url}
    this.setState({ formData })
    document.getElementById('progress').innerHTML = 'image chosen'
  }

  handleUploadCv(e) {
    const formData = {...this.state.formData, cv: e.filesUploaded[0].url}
    this.setState({ formData })
    document.getElementById('progress').innerHTML = 'CV chosen'
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/applicants/', this.state.formData)
      .then(res => {
        this.props.history.push('/offers')
      })
      .catch(err => this.setState({ errors: err.response.data }))
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
                <div className="Dropzone upload-box">
                  <div className="uploadbutton">
                    <ReactFilestack
                      mode="transform"
                      apikey={fileKEY}
                      buttonClass="button"
                      options={imageUpload}
                      onSuccess={(e) => this.handleUploadImages(e)}
                      preload={true}
                    />
                    <div><span id="progress"></span></div>
                  </div>
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
                <label className="label">Upload your CV</label>
                <div className="Dropzone upload-box">
                  <div className="uploadbutton">
                    <ReactFilestack
                      mode="transform"
                      apikey={fileKEY}
                      buttonClass="button"
                      onSuccess={(e) => this.handleUploadCv(e)}
                      preload={true}
                    />
                    <div><span id="progress"></span></div>
                  </div>
                </div>
                {this.state.errors.cv && <small className="help is-danger">{this.state.errors.cv}</small>}
              </div>

              <div className="field">
                <label className="label">Technologies:</label>
                <div className="control">
                  <Select
                    isMulti
                    isSearchable
                    name="skills"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    onChange={this.handleChangeSkills}
                    options={skills}
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
