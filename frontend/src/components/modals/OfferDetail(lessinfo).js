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

          </header>
          <section clasName="modal-card-body">
            <h2>{this.state.offer.role}</h2>
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
