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
      offers: [],
      specificoffer: '-'
    },
    this.filterOffers = this.filterOffers.bind(this)
    this.handleKeyUpJobtitle = this.handleKeyUpJobtitle.bind(this)
    this.handleKeyUpCompany = this.handleKeyUpCompany.bind(this)
    this.handleChangeOrder = this.handleChangeOrder.bind(this)
    this.handleChangeTechnologies = this.handleChangeTechnologies.bind(this)
    this.showOffer = this.showOffer.bind(this)
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

  showOffer(e){
    console.log(e.target.value)
    axios.get(`/api/offers/${e.target.value}/`)
      .then(res => this.setState({ specificoffer: res.data}))
      .then(console.log(this.state.specificoffer))
  }

  render() {
    console.log(this.state.filterData)
    console.log(this.filterOffers())
    return (
      <section className="section">
        <Navbar/>
        <section className="hero is-small has-background">
          <img alt="Home image" className="hero-background is-transparent" src="https://imgur.com/nHBe5HQ.jpg" />
          <div className="hero-body">
            <div className="container has-navbar-fixed-top">
              <div className="header">
                <h1 className="title is-1 has-text-danger has-text-centered">
                  OFFERS
                </h1>
                <h2 className="subtitle is-4 has-text-centered">
                  See offers from companies commited in women in tech growth.
                </h2>
              </div>
              <br/>
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
                  <div className="field is-grouped is-grouped-centered">
                    <label className="label">Technologies:</label>
                    <div className="control">
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
                    <label className="label">Find a match with your skills: </label>
                    <div className="control">
                      <button className=" control button is-danger is-outlined">Yes, please</button>
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
              {this.filterOffers().map(offer =>
                <div
                  key={offer.id}
                  className="column is-half"
                >
                  <span className="OfferCard">
                    <div>
                      <OfferCard
                        onClick={this.showOffer}
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
                    </div>
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="column is-one-third"> {(this.state.specificoffer !== '-') &&
            <div className="tile is-parent">
              <article className="tile is-child notification is-danger is-bold">
                <div className="content">
                  <p className="title has-text-dark">{this.state.specificoffer.jobtitle} - {this.state.specificoffer.company.name}</p>
                  <p className="subtitle has-text-dark">{this.state.specificoffer.role}</p>
                  <p className="subtitle is-6">{this.state.specificoffer.description_of_role}</p>
                  <div className="content">
                    <p>{this.state.specificoffer.role}</p>
                    <p className="content text"><span className="has-text-weight-semibold">Location: </span>{this.state.specificoffer.company.location}</p>
                    <p className="content text"><span className="has-text-weight-semibold">Technologies required: </span><div className="tags">{this.state.specificoffer.technologies.map(technology => <div className="tag" key={technology}>{technology}</div>)}</div></p>
                    <p className="content text"><span className="has-text-weight-semibold">Description of the role: </span>{this.state.specificoffer.description_of_role}</p>
                    <p className="content text"><span className="has-text-weight-semibold">Qualifications: </span>{this.state.specificoffer.qualifications}</p>
                    <p className="content text"><span className="has-text-weight-semibold">Benefits: </span>{this.state.specificoffer.benefits}</p>
                    <p className="content text"><span className="has-text-weight-semibold">Previous experience: </span>{this.state.specificoffer.experience_in_years}</p>
                    <p className="content text"><span className="has-text-weight-semibold">Wage: </span> $ {this.state.specificoffer.wage}</p>
                    <button clasName="button is-danger is-inverted">Apply</button>
                  </div>
                </div>
              </article>
            </div> }
          </div>
        </div>
      </section>
    )
  }
}

export default OfferIndex
