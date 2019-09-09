import React from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../common/Navbar'
import Auth from '../../lib/Auth'
import axios from 'axios'

class CompanyProfile extends React.Component {

  constructor() {
    super()
    this.state = {
      errors: {}
    }
    this.handleDeleteCompany = this.handleDeleteCompany.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/companies/${this.props.match.params.id}`)
      .then(res => this.setState({ company: res.data }))
  }

  handleDeleteCompany(e) {
    e.preventDefault()

    axios.delete(`/api/companies/${this.props.match.params.id}`, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/'))
  }

  render() {
    return (
      <section className="hero is-large has-background">
        <img alt="Home image" className="hero-background is-transparent" src="https://i.imgur.com/UHlP7Fj.jpg" />
        <div className="hero-body">
          <Navbar/>
          <div className="container">
            <div>
              <h2 className="title">Company Profile</h2>
              <figure className="image">
                <img src={this.state.company.logo} alt={this.state.company.user.username} />
              </figure>
              <h2 className="subtitle">{this.state.company.name}</h2>
              <h3 className="subtitle">{this.state.company.location}</h3>
              <h3 className="subtitle">{this.state.company.industry}</h3>
              <h3 className="subtitle">{this.state.company.description}</h3>
              <h3 className="subtitle"><span className="has-text-weight-semibold">Efforts on women equality:</span>{this.state.company.women_achievements}</h3>
              <h3 className="subtitle"><span className="has-text-weight-semibold">Number of employees:</span>{this.state.company.employees}</h3>
              <h3 className="subtitle"><span className="has-text-weight-semibold">percentage of women employees:</span>{this.state.company.women_employees_percentaje}</h3>
              <div className="buttons has-text-centered">
                <a  href={this.state.company.website} className="button is-medium is-danger is-inverted" rel="noopener noreferrer" target="_blank"><img src="https://i.imgur.com/hfjEwCN.png" alt="Portfolio"/>Website</a>
              </div>
            </div>
            <div className="buttons" id="home-buttons">
              <Link to ={`/companies/${this.state.company._id}/edit`}><a className="button is-danger is-outlined" id="first-button">Edit</a></Link>
              <a className="button is-danger is-outlined" id="second-button" onClick={this.handleDeleteApplicant}>Delete</a>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default CompanyProfile
