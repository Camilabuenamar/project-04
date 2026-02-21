import React from 'react'


const UserCard = ({ id, firstname, lastname, headline, roles, skills, onClick }) => {
  roles = roles[1] ? roles : [roles]
  return (
    <div className="box card-equal-heigh">
      <div className="card-header">
        <div className="card-header-title has-text-danger has-text-centered">{firstname} {lastname}</div>
      </div>
      <div className="card-content">
        <p className="subtitle is-6">{headline}</p>
        <p className="content text"> <span>Roles: </span>
          <div className="tags">{roles.map(role => <div className="tag" key={role}>{role}</div>)}</div>
        </p>
        <p className="content text"> <span>Technologies: </span>
          <div className="tags">{skills.map(skill => <div className="tag" key={skill}>{skill}</div>)}</div>
        </p>
      </div>
      <button className="button is-fullwidth is-danger is-outlined" value={id} onClick={onClick}>See more</button>
    </div>
  )
}

export default UserCard
