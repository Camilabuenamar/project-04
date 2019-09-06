import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class App extends React.Component {
  componentDidMount() {
    axios.get('/api/applicants/')
      .then(res => console.log(res.data))
  }

  render() {
    return (
      <h1>Welcome to Ada</h1>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
