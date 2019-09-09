import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

class UserModal extends React.Component {

  constructor() {

    super()
    this.state = {
      offer: {},
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.setState({modalIsOpen: true})
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }

  componentDidMount() {
    axios.get(`/api/applicants/${this.props.match.params.id}`)
      .then(res => this.setState({ company: res.data }))
  }

  render() {
    console.log(this.state)
    return (
      <section className="section">
        <button className="button is-danger" onClick={this.openModal}>Applicant:</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
          className="containerApplicant"
        >

          <div className="container">
            <div clasName="modal">
              <div clasName="modal-background"></div>
              <div clasName="modal-card">
                <header clasName="modal-card-head">
                  <p clasName="modal-card-title">{this.state.applicant.firstname} {this.state.applicant.lastname}</p>
                  <button clasName="delete" aria-label="close"></button>
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
                <footer clasName="modal-card-foot">
                  {/* if is company the owner: edit, if it is user: apply */}
                  <button clasName="button is-danger is-outlined" onClick={this.closeModal}>Close</button>
                </footer>
              </div>
            </div>
          </div>
        </Modal>


      </section>
    )
  }
}

export default withRouter(UserModal)
