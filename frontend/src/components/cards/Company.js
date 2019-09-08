import React from 'react'


const CompanyCard = ({ name, logo, location, industry, women_achievements }) => {
  return (
    <div className="box">
      <div class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
          </figure>
        </div>
        <div className="media-content">
          <div class="content">{name}</div>
          <div className="card-content">
            <h2 className="content text">{industry}</h2>
            <h2 className="content text">{location}</h2>
            <h2 className="content text">{women_achievements}</h2>
          </div>
        </div>
    </div>
  )
}

export default CompanyCard
