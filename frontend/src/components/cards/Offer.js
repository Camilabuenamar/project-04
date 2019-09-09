import React from 'react'
import OfferModal from '../modals/OfferDetail'


const OfferCard = ({ name, location, jobtitle, role, wage, technologies }) => {
  return (
    <div className="box">
      <div className="card-header">
        <div className="card-header-title">{jobtitle} </div>
      </div>
      <div className="card-content">
        <h2 className="content text">{name}</h2>
        <h2 className="content text">{location}</h2>
        <h2 className="content text">{role}</h2>
        <p className="subtitle"> <span className="has-text-weight-semibold">Techonologies: </span>
          <div className="tags">{technologies.map(technology => <div className="tag" key={technology}>{technology}</div>)}</div>
        </p>
        <h2 className="content text">{wage}</h2>
        <span className="button is-danger"><OfferModal/></span>
      </div>
    </div>
  )
}

export default OfferCard
