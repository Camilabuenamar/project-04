import React from 'react'
import CompanyModal from '../modals/CompanyDetail'


const CompanyCard = ({ name, logo, location, industry, women_achievements }) => {
  return (
    <div className="box">
      <div className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">{name}</div>
          <div className="card-content">
            <h2 className="content text">{industry}</h2>
            <h2 className="content text">{location}</h2>
            <h2 className="content text">{women_achievements}</h2>
          </div>
        </div>
        <span className="button is-danger"><CompanyModal/></span>
      </div>
    </div>
  )
}

export default CompanyCard
