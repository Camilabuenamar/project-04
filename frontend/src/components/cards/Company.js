import React from 'react'
import CompanyModal from '../modals/CompanyDetail'


const CompanyCard = ({ key, name, logo, location, industry, womenAchievements }) => {
  return (
    <div className="box">
      <div className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img src={logo} alt={name} />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">{name}</div>
          <div className="card-content">
            <h2 className="content text">{industry}</h2>
            <h2 className="content text">{location}</h2>
            <h2 className="content text">{womenAchievements}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyCard
