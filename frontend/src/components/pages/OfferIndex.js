import React from 'react'
import {Link} from 'react-router-dom'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import OfferCard from '../cards/Offer.js'
import Navbar from '../common/Navbar.js'
import axios from 'axios'
import _ from 'lodash'
const animatedComponents = makeAnimated()

const technologies = [
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'Python', label: 'Python' },
  { value: 'React', label: 'React' },
  { value: 'Java', label: 'Java' },
  { value: 'HTML', label: 'HTML' },
  { value: 'Git', label: 'Git' },
  { value: 'Node.js', label: 'Node.js' },
  { value: 'CSS', label: 'CSS' },
  { value: 'MySQL', label: 'MySQL' },
  { value: 'Amazon Web Services (AWS)', label: 'Amazon Web Services (AWS)' },
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

class OfferIndex extends React.Component {
  constructor() {
    super()

    this.state = {
      filterData: {
        searchTermJob: '',
        searchTermCom: '',
        sortTerm: 'jobtitle|asc',
        technologies: []
      },
      burgers: []
    },
    this.filterOffers = this.filterOffers.bind(this)
    this.handleKeyUpJobtitle = this.handleKeyUpJobtitle.bind(this)
    this.handleKeyUpCompany = this.handleKeyUpCompany.bind(this)
    this.handleChangeOrder = this.handleChangeOrder.bind(this)
    this.handleChangeTechnologies = this.handleChangeTechnologies.bind(this)
  }

  componentDidMount() {
    axios.get('/api/offers/')
      .then(res => this.setState({ offers: res.data}))
  }

  handleChangeTechnologies(selectedTechnologies) {
    const technologies = selectedTechnologies.map(technologies => technologies.value)
    const filterData = { ...this.state.filterData, technologies: technologies}
    this.setState({ filterData })
  }

  handleKeyUpJobtitle(e) {
    const filterData = { ...this.state.filterData, searchTermJob: e.target.value }
    this.setState({ filterData })
  }

  handleKeyUpCompany(e) {
    const filterData = { ...this.state.filterData, searchTermCom: e.target.value }
    this.setState({ filterData })
  }

  handleChangeOrder(e) {
    const filterData = { ...this.state.filterData, sortTerm: e.target.value }
    this.setState({ filterData})
  }

  filterOffers() {
    const { searchTermJob, searchTermCom, technologies, sortTerm } = this.state.filterData
    const reJob = new RegExp(searchTermJob, 'i')
    const reCom = new RegExp(searchTermCom, 'i')
    const [field, order] = sortTerm.split('|')
    const filterOffers = _.filter(this.state.offers, offer => {
      return (technologies.length ? _.intersection(offer.technologies, technologies).length >= technologies.length : true) &&
        (reJob.test(offer.jobtitle)) && (reCom.test(offer.company.name))
    })

    const sortedOffers = _.orderBy(filterOffers, [field], [order])
    return sortedOffers
  }

  render() {
    console.log(this.state.filterData)
    console.log(this.filterOffers())
    return (
      <section className="section">
        <Navbar/>
        <div className="container has-navbar-fixed-top">
          <div className="filters">
            <form>
              <div className="field is-grouped is-grouped-centered">
                <div className="control">
                  <input
                    placeholder="Search Jobtitle"
                    className="input"
                    onKeyUp={this.handleKeyUpJobtitle}/>
                </div>
                <div className="control">
                  <input
                    placeholder="Search Company"
                    className="input"
                    onKeyUp={this.handleKeyUpCompany}/>
                </div>
                <label className="label">Order by: </label>
                <div className="select">
                  <select onChange={this.handleChangeOrder}>
                    <option value="jobtitle|asc"> A - Z</option>
                    <option value="jobtitle|desc"> Z - A</option>
                    <option value="wage|desc"> Higher Wage first</option>
                    <option value="wage|asc"> Lower Wage first</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label className="label">Technologies:</label>
                <div className="control is-expanded">
                  <Select
                    isMulti
                    isSearchable
                    name="technologies"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    onChange={this.handleChangeTechnologies}
                    options={technologies}
                  />
                </div>
                <div>
                  <label className="label">Find a match with your skills</label>
                  <a className="button is-danger is-outlined">Yes, please</a>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="columns is-multiline">
          {this.filterOffers().map(offer =>
            <div
              key={offer.id}
              className="column is-half"
            >
              <span className="OfferCard">
                <OfferCard
                  id={offer.id}
                  name={offer.company.name}
                  location={offer.company.location}
                  jobtitle={offer.jobtitle}
                  role={offer.role}
                  wage={offer.wage}
                  experience={offer.experience_in_years}
                  description={offer.description_of_role}
                  qualifications={offer.qualifications}
                  benefits={offer.benefits}
                  technologies={offer.technologies}
                />
              </span>
            </div>
          )}
        </div>
      </section>
    )
  }
}

export default OfferIndex
