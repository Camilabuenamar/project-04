import React from 'react'
import UserModal from '../modals/UserDetail'


const UserCard = ({ firstname, lastname, headline, roles, skills }) => {
  roles = roles[1] ? roles : [roles]
  return (
    <div className="box card-equal-heigh">
      <div className="card-header">
        <div className="card-header-title">{firstname} {lastname}</div>
      </div>
      <div className="card-content">
        <h2 className="content text">{headline}</h2>
        <h2 className="subtitle"> <span className="has-text-weight-semibold">Roles: </span>
          <div className="tags">{roles.map(role => <div className="tag" key={role}>{role}</div>)}</div>
        </h2>
        <h2 className="subtitle"> <span className="has-text-weight-semibold">Technologies: </span>
          <div className="tags">{skills.map(skill => <div className="tag" key={skill}>{skill}</div>)}</div>
        </h2>
      </div>
    </div>
  )
}

export default UserCard
