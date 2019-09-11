import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class CompanyModal extends React.Component {

  constructor() {

    super()
    this.state = {
      formData: {},
      errors: {},
      company: []
    }
  }

  componentDidMount() {
    axios.get(`/api/companies/${this.props.match.params.id}/`)
      .then(res => this.setState({ company: res.data }))
  }

  render() {
    console.log(this.state)
    return (
      <section className="section">
        <div className="container">
          <header clasName="header">
            <figure className="image">
              <img src={this.state.company.logo} alt={this.state.company.name} />
            </figure>
            <p clasName="title">{this.state.company.name}</p>
          </header>
          <section clasName="">
            <h2>{this.state.company.description}</h2>
            <h3 className="content text"><span className="has-text-weight-semibold">Location:</span>{this.state.company.location}</h3>
            <h3 className="content text"><span className="has-text-weight-semibold">Industry:</span>{this.state.company.industry}</h3>
            <h3 className="content text"><span className="has-text-weight-semibold">Efforts on women equality:</span>{this.state.company.women_achievements}</h3>
            <h3 className="content text"><span className="has-text-weight-semibold">Number of employees:</span>{this.state.company.employees}</h3>
            <h3 className="content text"><span className="has-text-weight-semibold">percentage of women employees:</span>{this.state.company.women_employees_percentaje}</h3>

            <a  href={this.state.company.website} className="button is-medium is-danger is-inverted" rel="noopener noreferrer" target="_blank"><img className="icon" src="https://i.imgur.com/hfjEwCN.png" alt="Portfolio"/>Website</a>
          </section>
        </div>
      </section>
    )
  }
}

export default withRouter(CompanyModal)
