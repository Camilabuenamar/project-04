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

class CompanyModal extends React.Component {

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
    axios.get(`/api/companies/${this.props.match.params.id}`)
      .then(res => this.setState({ company: res.data }))
  }

  render() {
    console.log(this.state)
    return (
      <section className="section">
        <button className="button is-danger" onClick={this.openModal}>Company Detail</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
          className="containerCompany"
        >

          <div className="container">
            <div clasName="modal">
              <div clasName="modal-background"></div>
              <div clasName="modal-card">
                <header clasName="modal-card-head">
                  <p clasName="modal-card-title">{this.state.company.name}</p>
                  <button clasName="delete" aria-label="close"></button>
                </header>
                <section clasName="modal-card-body">
                  <figure className="image">
                    <img src={this.state.company.logo} alt={this.state.company.user.username} />
                  </figure>
                  <h2>{this.state.company.description}</h2>
                  <h3 className="content text"><span className="has-text-weight-semibold">Location:</span>{this.state.company.location}</h3>
                  <h3 className="content text"><span className="has-text-weight-semibold">Industry:</span>{this.state.company.industry}</h3>
                  <h3 className="content text"><span className="has-text-weight-semibold">Industry:</span>{this.state.company.industry}</h3>
                  <h3 className="content text"><span className="has-text-weight-semibold">Efforts on women equality:</span>{this.state.company.women_achievements}</h3>
                  <h3 className="content text"><span className="has-text-weight-semibold">Number of employees:</span>{this.state.company.employees}</h3>
                  <h3 className="content text"><span className="has-text-weight-semibold">percentage of women employees:</span>{this.state.company.women_employees_percentaje}</h3>

                  <a  href={this.state.company.website} className="button is-medium is-danger is-inverted" rel="noopener noreferrer" target="_blank"><img src="https://i.imgur.com/hfjEwCN.png" alt="Portfolio"/>Website</a>
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

export default withRouter(CompanyModal)
