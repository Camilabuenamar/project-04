import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export function withRouter(Component) {
  function ComponentWithRouter(props) {
    const navigate = useNavigate()
    const location = useLocation()
    const history = {
      push: navigate,
      replace: (path) => navigate(path, { replace: true })
    }
    return <Component {...props} history={history} location={location} />
  }
  return ComponentWithRouter
}
