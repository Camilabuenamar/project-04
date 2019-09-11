import React from 'react'
import OfferModal from '../modals/OfferDetail'


const OfferCard = ({ id, name, location, jobtitle, role, wage, technologies, onClick }) => {
  return (
    <div className="box card-equal-heigh">
      <div className="card-header">
        <div className="card-header-title has-text-danger has-text-centered">{jobtitle} </div>
      </div>
      <div className="card-content">
        <h2 className="content text has-text-weight-semibold">{name}</h2>
        <h2 className="content text">📍{location}</h2>
        <h2 className="content text">{role}</h2>
        <p className="subtitle is-6"> <span className="has-text-weight-semibold">Technologies: </span>
          <div className="tags">{technologies.map(technology => <div className="tag" key={technology}>{technology}</div>)}</div>
        </p>
        <h2 className="content text"><span className="has-text-weight-semibold">£ </span>{wage}</h2>
      </div>
      <button className="button is-fullwidth is-danger is-outlined" value={id} onClick={onClick}>See more</button>
    </div>
  )
}

export default OfferCard
