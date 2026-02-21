import React from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import 'bulma/css/bulma.min.css'
import './style.scss'
import { HashRouter, Route, Routes } from 'react-router-dom'

if (process.env.API_URL) {
  axios.defaults.baseURL = process.env.API_URL
}

import Home from './components/pages/Home'
import About from './components/pages/About'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import CompanyRegister from './components/auth/CompanyRegister'
import UserRegister from './components/auth/UserRegister'
import OfferIndex from './components/pages/OfferIndex'
import CompanyIndex from './components/pages/CompanyIndex'
import UserIndex from './components/pages/UserIndex'

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/applicants" element={<UserIndex />} />
          <Route path="/companies" element={<CompanyIndex />} />
          <Route path="/offers" element={<OfferIndex />} />
          <Route path="/userregistration" element={<UserRegister />} />
          <Route path="/companyregistration" element={<CompanyRegister />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </HashRouter>
    )
  }
}

createRoot(document.getElementById('root')).render(<App />)
