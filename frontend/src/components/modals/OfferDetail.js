import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class CompanyModal extends React.Component {

  constructor() {

    super()
    this.state = {
      formData: {},
      errors: {},
      offer: []
    }
  }

  componentDidMount() {
    axios.get(`/api/offers/${this.props.match.params.id}/`)
      .then(res => this.setState({ offer: res.data }))
  }

  render() {
    console.log(this.state)
    return (
      <section className="section">
        <div className="container">
          <header clasName="modal-card-head">
            <p clasName="modal-card-title">{this.state.offer.jobtitle} - {this.state.offer.company.name[0]}</p>
          </header>
          <section clasName="modal-card-body">
            <h2>{this.state.offer.role}</h2>
            <h3 className="content text"><span className="has-text-weight-semibold">Location:</span>{this.state.offer.company}</h3>
            <h3 className="content text"><span className="has-text-weight-semibold">Technologies required:</span><div className="tags">{this.state.offer.technologies.map(technology => <div className="tag" key={technology}>{technology}</div>)}</div></h3>
            <h3 className="content text"><span className="has-text-weight-semibold">Description of the role:</span>{this.state.offer.description_of_role}</h3>
            <h3 className="content text"><span className="has-text-weight-semibold">Qualifications:</span>{this.state.offer.qualifications}</h3>
            <h3 className="content text"><span className="has-text-weight-semibold">Benefits:</span>{this.state.offer.benefits}</h3>
            <h3 className="content text"><span className="has-text-weight-semibold">Previous experience:</span>{this.state.offer.experience_in_years}</h3>
            <h3 className="content text"><span className="has-text-weight-semibold">Wage:</span>{this.state.offer.wage}</h3>
          </section>
        </div>
      </section>
    )
  }
}

export default withRouter(CompanyModal)
