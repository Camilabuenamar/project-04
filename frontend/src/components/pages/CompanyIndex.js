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
        sortTerm: 'name|asc'
      },
      companies: []
    },
    this.filterCompanies = this.filterCompanies.bind(this)
    this.handleKeyUpCompany = this.handleKeyUpCompany.bind(this)
    this.handleChangeOrder = this.handleChangeOrder.bind(this)
    this.handleChangeIndustry = this.handleChangeIndustry.bind(this)
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
      return (reCom.test(company.name)) && (industry === company.industry)
    })

    const sortedCompanies = _.orderBy(filterCompanies, [field], [order])
    return this.state.companies
  }
  render() {
    return (
      <section className="section">
        <Navbar/>
        <div className="container">
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
        <div className="columns is-multiline">
          {this.filterCompanies().map(company =>
            <div
              key={company.id}
              className="column is-half"
            >
              <span className="CompanyCard">
                <CompanyCard
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
              </span>
            </div>
          )}
        </div>
      </section>
    )
  }
}

export default CompanyIndex
