import React from 'react'
import {Link} from 'react-router-dom'
import UserCard from '../cards/User.js'
import Navbar from '../common/Navbar.js'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
const animatedComponents = makeAnimated()
import axios from 'axios'
import _ from 'lodash'

const roles = [
  { value: 'all', label: 'All' },
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

const technologies = [
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

class UserIndex extends React.Component {
  constructor() {
    super()

    this.state = {
      filterData: {
        searchTerm: '',
        sortTerm: 'firstname|asc',
        role: 'all',
        skills: []
      },
      applicants: [],
      specificapplicant: '-'
    },
    this.filterApplicants = this.filterApplicants.bind(this)
    this.handleKeyUpUser = this.handleKeyUpUser.bind(this)
    this.handleChangeOrder = this.handleChangeOrder.bind(this)
    this.handleChangeRole = this.handleChangeRole.bind(this)
    this.handleChangeTechnologies = this.handleChangeTechnologies.bind(this)
    this.showApplicant = this.showApplicant.bind(this)
  }

  componentDidMount() {
    axios.get('/api/applicants/')
      .then(res => this.setState({ applicants: res.data}))
  }


  handleKeyUpUser(e) {
    const filterData = { ...this.state.filterData, searchTerm: e.target.value }
    this.setState({ filterData })
  }

  handleChangeOrder(e) {
    const filterData = { ...this.state.filterData, sortTerm: e.target.value }
    this.setState({ filterData})
  }

  handleChangeTechnologies(selectedTechnologies) {
    const skills = selectedTechnologies.map(skills => skills.value)
    const filterData = { ...this.state.filterData, skills: skills}
    this.setState({ filterData })
  }

  handleChangeRole(e) {
    const filterData = { ...this.state.filterData, roles: e.target.value}
    this.setState( { filterData })

  }

  filterApplicants() {
    const { searchTerm, skills, sortTerm, role } = this.state.filterData
    const re = new RegExp(searchTerm, 'i')
    const [field, order] = sortTerm.split('|')
    const filterApplicants =_.filter(this.state.applicants, applicant => {
      return (skills.length ? _.intersection(applicant.skills, skills).length >= skills.length : true) &&
        (re.test(applicant.firstname) || re.test(applicant.lastname)) && (role === 'all' ? true  : (role === applicant.roles))
    })

    const sortedApplicants = _.orderBy(filterApplicants, [field], [order])
    return sortedApplicants
  }

  showApplicant(e){
    console.log(e.target.value)
    axios.get(`/api/applicants/${e.target.value}/`)
      .then(res => this.setState({ specificapplicant: res.data}))
      .then(console.log(this.state.specificapplicant))
  }

  render() {
    console.log(this.state.filterData)
    console.log(this.state.applicants)
    return (
      <section className="section">
        <Navbar/>
        <section className="hero is-small has-background">
          <img alt="Home image" className="hero-background is-transparent" src="https://imgur.com/wKaaJ9L.jpg" />
          <div className="hero-body">
            <div className="container has-navbar-fixed-top">
              <div className="header">
                <h1 className="title is-1 has-text-danger has-text-centered">
                  APPLICANTS
                </h1>
                <h2 className="subtitle is-4 has-text-centered">
                  Here you can find the best talent of women in tech.
                </h2>
              </div>
              <br/>
              <div className="filters">
                <form>
                  <div className="field is-grouped is-grouped-centered">
                    <div className="control">
                      <input
                        placeholder="Search User"
                        className="input"
                        onKeyUp={this.handleKeyUpUser}/>
                    </div>
                    <label className="label">Order by: </label>
                    <div className="select">
                      <select onChange={this.handleChangeOrder}>
                        <option value="firstname|asc"> Firstname A - Z</option>
                        <option value="firstname|desc"> Firstname Z - A</option>
                        <option value="lastname|asc"> Lastname A - Z</option>
                        <option value="lastname|desc"> Lastname Z - A</option>
                      </select>
                    </div>
                  </div>
                  <div className="field is-grouped is-grouped-centered">
                    <label className="label">Role: </label>
                    <div className="control">
                      <Select
                        isSearchable
                        name="roles"
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        onChange={this.handleChange}
                        options={roles}
                        className="react-select"
                      />
                    </div>
                    <label className="label">Technologies: </label>
                    <div className="control">
                      <Select
                        isMulti
                        isSearchable
                        name="skills"
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        onChange={this.handleChangeTechnologies}
                        options={technologies}
                        className="react-select"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <br/>
        <div className="columns">
          <div className="column is-two-thirds">
            <div className="columns is-multiline">
              {this.filterApplicants().map(applicant =>
                <div
                  key={applicant.id}
                  className="column is-half"
                >
                  <span className="UserCard">
                    <div>
                      <UserCard
                        id={applicant.id}
                        firstname={applicant.firstname}
                        lastname={applicant.lastname}
                        image={applicant.image}
                        headline={applicant.headline}
                        roles={applicant.roles}
                        linkedin={applicant.linkedin}
                        portfolio={applicant.portfolio}
                        github={applicant.github}
                        cv={applicant.cv}
                        skills={applicant.skills}
                        onClick={this.showApplicant}
                      />
                    </div>
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="column is-one-third"> {(this.state.specificapplicant !== '-') &&
            <div className="tile is-parent box">
              <article className="tile is-child is-danger is-bold">
                <div className="content">
                  <br/>
                  <div className="level">
                    <figure className="level-right image is-96x96">
                      <img src={this.state.specificapplicant.image} alt={this.state.specificapplicant.user.username} />
                    </figure>
                  </div>
                  <br/>
                  <p className="title has-text-danger">{this.state.specificapplicant.firstname} {this.state.specificapplicant.lastname}</p>
                  <p className="subtitle is-6">{this.state.specificapplicant.headline}</p>
                  <div className="content">
                    <h3 className="subtitle"><span className="has-text-weight-semibold">Desired roles:</span><div className="tags">{this.state.specificapplicant.roles.map(role => <div className="tag" key={role}>{role}</div>)}</div></h3>
                    <h3 className="subtitle"><span className="has-text-weight-semibold">Technologies:</span><div className="tags">{this.state.specificapplicant.skills.map(skill => <div className="tag" key={skill}>{skill}</div>)}</div></h3>
                    <div className="buttons has-text-centered">
                      <a  href={this.state.specificapplicant.github} className="button is-small is-danger is-outlined" rel="noopener noreferrer" target="_blank"><img className="icon" src="https://i.imgur.com/Y0Mskai.png" alt="GithubLogo"/>GitHub</a>
                      <a  href={this.state.specificapplicant.linkedin} className="button is-small is-danger is-outlined" rel="noopener noreferrer" target="_blank"><img className="icon" src="https://i.imgur.com/2IsOkIY.png" alt="LinkedLogo"/>LinkedIn</a>
                      <a  href={this.state.specificapplicant.portfolio} className="button is-small is-danger is-outlined" rel="noopener noreferrer" target="_blank"><img className="icon" src="https://i.imgur.com/hfjEwCN.png" alt="Portfolio"/>Portfolio</a>
                      <a  href={this.state.specificapplicant.cv} className="button is-small is-danger is-outlined" rel="noopener noreferrer" target="_blank"><img className="icon" src="https://i.imgur.com/Rn77cJl.png" alt="CV"/>Download CV</a>
                    </div>
                  </div>
                  <button className="button is-danger is-fullwidth"> ✉️Contact</button>
                </div>
              </article>
            </div> }
          </div>
        </div>
      </section>
    )
  }
}

export default UserIndex
