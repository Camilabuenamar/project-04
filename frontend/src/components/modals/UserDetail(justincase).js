import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class ApplicantModal extends React.Component {

  constructor() {

    super()
    this.state = {
      formData: {},
      errors: {},
      applicant: []
    }
  }

  componentDidMount() {
    axios.get(`/api/applicants/${this.props.match.params.id}/`)
      .then(res => this.setState({ applicant: res.data }))
  }

  render() {
    console.log(this.state)
    return (
      <section className="section">
        <div className="container">
          <header clasName="modal-card-head">
            <p clasName="modal-card-title">{this.state.applicant.firstname} {this.state.applicant.lastname}</p>
          </header>
          <section clasName="modal-card-body">
            <figure className="image">
              <img src={this.state.applicant.image} alt={this.state.applicant.user.username} />
            </figure>
            <h2>{this.state.applicant.headline}</h2>
            <h3 className="subtitle"><span className="has-text-weight-semibold">Desired roles:</span><div className="tags">{this.state.offer.roles.map(role => <div className="tag" key={role}>{role}</div>)}</div></h3>
            <h3 className="subtitle"><span className="has-text-weight-semibold">Technologies:</span><div className="tags">{this.state.offer.skills.map(skill => <div className="tag" key={skill}>{skill}</div>)}</div></h3>
            <div className="buttons has-text-centered">
              <a  href={this.state.applicant.github} className="button is-medium is-danger is-inverted" rel="noopener noreferrer" target="_blank"><img src="https://i.imgur.com/Y0Mskai.png" alt="GithubLogo"/>GitHub</a>
              <a  href={this.state.applicant.linkedin} className="button is-medium is-danger is-inverted" rel="noopener noreferrer" target="_blank"><img src="https://i.imgur.com/2IsOkIY.png" alt="LinkedLogo"/>LinkedIn</a>
              <a  href={this.state.applicant.portfolio} className="button is-medium is-danger is-inverted" rel="noopener noreferrer" target="_blank"><img src="https://i.imgur.com/hfjEwCN.png" alt="Portfolio"/>Portfolio</a>
              <a  href={this.state.applicant.cv} className="button is-medium is-danger is-inverted" rel="noopener noreferrer" target="_blank"><img src="https://i.imgur.com/Rn77cJl.png" alt="CV"/>Download CV</a>
            </div>
          </section>
        </div>
      </section>
    )
  }
}

export default withRouter(ApplicantModal)
