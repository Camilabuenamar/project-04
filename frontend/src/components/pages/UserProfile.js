import React from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../common/Navbar'
import Auth from '../../lib/Auth'
import axios from 'axios'

class UserProfile extends React.Component {

  constructor() {
    super()
    this.state = {
      errors: {}
    }
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/applicants/${this.props.match.params.id}`)
      .then(res => this.setState({ applicant: res.data }))
  }

  handleDeleteUser(e) {
    e.preventDefault()

    axios.delete(`/api/applicants/${this.props.match.params.id}`, {
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
              <h2 className="title">Your Profile</h2>
              <figure className="image">
                <img src={this.state.applicant.image} alt={this.state.applicant.user.username} />
              </figure>
              <h2 className="subtitle">{this.state.applicant.firstname} {this.state.applicant.lastname}</h2>
              <h3 className="subtitle">{this.state.applicant.headline}</h3>
              <h3 className="subtitle"><span className="has-text-weight-semibold">Desired roles:</span><div className="tags">{this.state.offer.roles.map(role => <div className="tag" key={role}>{role}</div>)}</div></h3>
              <h3 className="subtitle"><span className="has-text-weight-semibold">Technologies:</span><div className="tags">{this.state.offer.skills.map(skill => <div className="tag" key={skill}>{skill}</div>)}</div></h3>
              <div className="buttons has-text-centered">
                <a  href={this.state.applicant.github} className="button is-medium is-danger is-inverted" rel="noopener noreferrer" target="_blank"><img src="https://i.imgur.com/Y0Mskai.png" alt="GithubLogo"/>GitHub</a>
                <a  href={this.state.applicant.linkedin} className="button is-medium is-danger is-inverted" rel="noopener noreferrer" target="_blank"><img src="https://i.imgur.com/2IsOkIY.png" alt="LinkedLogo"/>LinkedIn</a>
                <a  href={this.state.applicant.portfolio} className="button is-medium is-danger is-inverted" rel="noopener noreferrer" target="_blank"><img src="https://i.imgur.com/hfjEwCN.png" alt="Portfolio"/>Portfolio</a>
                <a  href={this.state.applicant.cv} className="button is-medium is-danger is-inverted" rel="noopener noreferrer" target="_blank"><img src="https://i.imgur.com/Rn77cJl.png" alt="CV"/>Download CV</a>
              </div>
            </div>
            <div className="buttons" id="home-buttons">
              <Link to ={`/applicants/${this.state.applicant._id}/edit`}><a className="button is-danger is-outlined" id="first-button">Edit</a></Link>
              <Link to ="/register"><a className="button is-danger is-outlined" id="second-button" onClick={this.handleDeleteApplicant}>Delete</a></Link>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default UserProfile
