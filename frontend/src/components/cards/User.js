import React from 'react'
import UserModal from '../modals/UserDetail'


const UserCard = ({ firstname, lastname, headline, roles, skills }) => {
  return (
    <div className="box">
      <div className="card-header">
        <div className="card-header-title">{firstname} {lastname}</div>
      </div>
      <div className="card-content">
        <h2 className="content text">{headline}</h2>
        <h2 className="subtitle"> <span className="has-text-weight-semibold">Roles: </span>
          <div className="tags">{roles.map(role => <div className="tag" key={role}>{role}</div>)}</div>
        </h2>
        <h2 className="subtitle"> <span className="has-text-weight-semibold">Techonologies: </span>
          <div className="tags">{skills.map(skill => <div className="tag" key={skill}>{skill}</div>)}</div>
        </h2>
        <span className="button is-danger"><UserModal/></span>
      </div>
    </div>
  )
}

export default UserCard
