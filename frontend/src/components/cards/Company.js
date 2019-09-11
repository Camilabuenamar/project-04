import React from 'react'
import CompanyModal from '../modals/CompanyDetail'


const CompanyCard = ({ id, name, logo, location, industry, womenAchievements, onClick }) => {
  return (
    <div className="box company-box card-equal-heigh">
      <div className="media ">
        <div className="media-left">
          <figure className="image is-64x64">
            <img src={logo} alt={name} />
          </figure>
        </div>
        <div className="media-content">
          <div className="has-text-weight-semibold tittle has-text-danger has-text-centered card-header-title is-size-4">{name}</div>
          <div className="card-content">
            <h2 className="content text has-text-weight-semibold">{industry}</h2>
            <h2 className="content text">📍{location}</h2>
          </div>
        </div>
      </div>
      <button className="button is-fullwidth is-danger is-outlined" value={id} onClick={onClick}>See more</button>
    </div>
  )
}

export default CompanyCard
