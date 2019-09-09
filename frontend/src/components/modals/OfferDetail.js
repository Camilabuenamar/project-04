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

class OfferModal extends React.Component {

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
    axios.get(`/api/offers/${this.props.match.params.id}`)
      .then(res => this.setState({ offer: res.data }))
  }




  render() {
    console.log(this.state)
    return (
      <section className="section">
        <button className="button is-danger" onClick={this.openModal}>Offer Detail</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
          className="containerOffer"
        >

          <div className="container">
            <div clasName="modal">
              <div clasName="modal-background"></div>
              <div clasName="modal-card">
                <header clasName="modal-card-head">
                  <p clasName="modal-card-title">{this.state.offer.jobtitle} - {this.state.offer.company.name}</p>
                  <button clasName="delete" aria-label="close"></button>
                </header>
                <section clasName="modal-card-body">
                  <h2>{this.state.offer.role}</h2>
                  <h3 className="content text"><span className="has-text-weight-semibold">Location:</span>{this.state.offer.company.location}</h3>
                  <h3 className="content text"><span className="has-text-weight-semibold">Technologies required:</span><div className="tags">{this.state.offer.technologies.map(technology => <div className="tag" key={technology}>{technology}</div>)}</div></h3>
                  <h3 className="content text"><span className="has-text-weight-semibold">Description of the role:</span>{this.state.offer.description_of_role}</h3>
                  <h3 className="content text"><span className="has-text-weight-semibold">Qualifications:</span>{this.state.offer.qualifications}</h3>
                  <h3 className="content text"><span className="has-text-weight-semibold">Benefits:</span>{this.state.offer.benefits}</h3>
                  <h3 className="content text"><span className="has-text-weight-semibold">Previous experience:</span>{this.state.offer.experience_in_years}</h3>
                  <h3 className="content text"><span className="has-text-weight-semibold">Wage:</span>{this.state.offer.wage}</h3>
                </section>
                <footer clasName="modal-card-foot">
                  {/* if is company the owner: edit, if it is user: apply */}
                  <button clasName="button is-danger is-outlined">Apply</button>
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

export default withRouter(OfferModal)
