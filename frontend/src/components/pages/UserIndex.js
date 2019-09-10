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
        sortTerm: 'firstname|asc'
      },
      applicants: []
    },
    this.filterApplicants = this.filterApplicants.bind(this)
    this.handleKeyUpUser = this.handleKeyUpUser.bind(this)
    this.handleChangeOrder = this.handleChangeOrder.bind(this)
    this.handleChangeRole = this.handleChangeRole.bind(this)
    this.handleChangeTechnologies = this.handleChangeTechnologies.bind(this)
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
    const technologies = selectedTechnologies.map(technologies => technologies.value)
    const filterData = { ...this.state.filterData, skills: technologies}
    this.setState({ filterData })
  }

  handleChangeRole(e) {
    const filterData = { ...this.state.filterData, roles: e.target.value}
    this.setState( { filterData })

  }

  filterApplicants() {
    const { searchTerm, technologies, sortTerm, roles } = this.state.filterData
    const re = new RegExp(searchTerm, 'i')
    const [field, order] = sortTerm.split('|')
    const filterApplicants =_.filter(this.state.applicants, applicant => {
      return (technologies.length ? _.intersection(applicant.skills, technologies).length >= technologies.length : true) &&
        (re.test(applicant.firstname) || re.test(applicant.lastname)) && _.intersection(applicant.roles, roles)
    })

    const sortedApplicants = _.orderBy(filterApplicants, [field], [order])
    return sortedApplicants
  }

  render() {
    console.log(this.state.filterData)
    console.log(this.filterApplicants())
    return (
      <section className="section">
        <Navbar/>
        <div className="container has-navbar-fixed-top">
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
                <label className="label">Role: </label>
                <div className="control">
                  <Select
                    isSearchable
                    name="roles"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    onChange={this.handleChange}
                    options={roles}
                  />
                </div>
                <label className="label">Technologies: </label>
                <div className="control">
                  <Select
                    isSearchable
                    name="skills"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    onChange={this.handleChangeTechnologies}
                    options={technologies}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="columns is-multiline">
          {this.filterApplicants().map(applicant =>
            <div
              key={applicant._id}
              className="column is-half"
            >
              <span className="UserCard">
                <UserCard
                  key={applicant._id}
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
                />
              </span>
            </div>
          )}
        </div>
      </section>
    )
  }
}

export default UserIndex
