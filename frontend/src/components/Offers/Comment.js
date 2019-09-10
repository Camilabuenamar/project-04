import React from 'react'
import Auth from '../../lib/Auth'
import UserModal from '../modals/UserDetail'



const Applicant = ({user, handledelete, _id}) => {
  return (
    <article className="media">
      <div className="media-content">
        <div className="content">
          <p><strong>{user.username}</strong></p>
        </div>
      </div>
      <span className="button is-danger"><UserModal/></span>
      {Auth.isCurrentUser(user) && <div className="media-right">
        <button id={_id} onClick={handledelete} className="delete"></button>
      </div>}
    </article>
  )
}

export default Applicant
