import React from 'react'
import {Link} from 'react-router-dom'
import CompanyCard from '../cards/Company.js'
import Navbar from '../common/Navbar.js'
import axios from 'axios'
import _ from 'lodash'

class CompanyIndex extends React.Component {
  constructor() {
    super()

    this.state = {
      filterData: {
        searchTermCom: '',
        sortTerm: 'name|asc',
        industry: 'all'
      },
      companies: [],
      specificcompany: {}
    },
    this.filterCompanies = this.filterCompanies.bind(this)
    this.handleKeyUpCompany = this.handleKeyUpCompany.bind(this)
    this.handleChangeOrder = this.handleChangeOrder.bind(this)
    this.handleChangeIndustry = this.handleChangeIndustry.bind(this)
    this.showCompany = this.showCompany.bind(this)
  }

  componentDidMount() {
    axios.get('/api/companies/')
      .then(res => this.setState({ companies: res.data}))
  }


  handleKeyUpCompany(e) {
    const filterData = { ...this.state.filterData, searchTermCom: e.target.value }
    this.setState({ filterData })
  }

  handleChangeOrder(e) {
    const filterData = { ...this.state.filterData, sortTerm: e.target.value }
    this.setState({ filterData})
  }

  handleChangeIndustry(e) {
    const filterData = { ...this.state.filterData, industry: e.target.value}
    this.setState( { filterData })
  }

  filterCompanies() {
    const { searchTermCom, industry, sortTerm } = this.state.filterData
    const reCom = new RegExp(searchTermCom, 'i')
    const [field, order] = sortTerm.split('|')
    const filterCompanies = _.filter(this.state.companies, company => {
      return reCom.test(company.name) && (industry === 'all' ? true  : (industry === company.industry))
    })

    const sortedCompanies = _.orderBy(filterCompanies, [field], [order])
    return sortedCompanies
  }

  showCompany(e){
    console.log(e.target.value)
    axios.get(`/api/companies/${e.target.value}/`)
      .then(res => this.setState({ specificcompany: res.data}))
      .then(console.log(this.state.specificcompany))
  }

  render() {
    return (
      <section className="section">
        <Navbar/>
        <section className="hero is-small has-background">
          <img alt="Home image" className="hero-background is-transparent" src="https://imgur.com/VAQzOZR.jpg" />
          <div className="hero-body">
            <div className="container has-navbar-fixed-top">
              <div className="header">
                <h1 className="title is-1 has-text-danger has-text-centered">
                  COMPANIES
                </h1>
                <h2 className="subtitle is-4 has-text-centered">
                  Find the companies commited in women in tech growth.
                </h2>
              </div>
              <br/>
              <div className="filters">
                <form>
                  <div className="field is-grouped is-grouped-centered">
                    <div className="control">
                      <input
                        placeholder="Search Company"
                        className="input"
                        onKeyUp={this.handleKeyUpCompany}/>
                    </div>
                    <label className="label">Order by: </label>
                    <div className="select">
                      <select onChange={this.handleChangeOrder}>
                        <option value="name|asc"> A - Z</option>
                        <option value="name|desc"> Z - A</option>
                      </select>
                    </div>
                    <label className="label">Industry: </label>
                    <div className="control select">
                      <select className="select" name="industry" onChange={this.handleChangeIndustry}>
                        <option value="all">All</option>
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
              {this.filterCompanies().map(company =>
                <div
                  key={company.id}
                  className="column is-half"
                >
                  <span className="CompanyCard">
                    <div>
                      <CompanyCard
                        onClick={this.showCompany}
                        id={company.id}
                        name={company.name}
                        location={company.location}
                        logo={company.logo}
                        industry={company.industry}
                        description={company.description}
                        website={company.website}
                        womenAchievements={company.women_achievements}
                        employees={company.employees}
                        womenEmployeesPercentaje={company.women_employees_percentaje}
                      />
                    </div>
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="column is-one-third">
            <div className="tile is-parent">
              <article className="tile is-child notification is-danger is-bold">
                <div className="content">
                  <br/>
                  <div className="level">
                    <figure className="level-right image is-96x96">
                      <img src={this.state.specificcompany.logo} alt={this.state.specificcompany.name} />
                    </figure>
                  </div>
                  <br/>
                  <p className="title has-text-dark">{this.state.specificcompany.name}</p>
                  <p className="subtitle is-6">{this.state.specificcompany.description}</p>
                  <div className="content">
                    <p className="content text"><span className="has-text-weight-semibold">Location: </span>{this.state.specificcompany.location}</p>
                    <p className="content text"><span className="has-text-weight-semibold">Industry: </span>{this.state.specificcompany.industry}</p>
                    <p className="content text"><span className="has-text-weight-semibold">Efforts on women equality: </span>{this.state.specificcompany.women_achievements}</p>
                    <p className="content text"><span className="has-text-weight-semibold">Number of employees: </span>{this.state.specificcompany.employees}</p>
                    <p className="content text"><span className="has-text-weight-semibold">percentage of women employees: </span>{this.state.specificcompany.women_employees_percentaje}</p>
                    <a  href={this.state.specificcompany.website} className="button is-medium is-danger is-inverted" rel="noopener noreferrer" target="_blank"><img className="icon" src="https://i.imgur.com/hfjEwCN.png" alt="Portfolio"/>Website</a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default CompanyIndex
