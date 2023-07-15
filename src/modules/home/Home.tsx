import React from 'react'
import { Home_Container } from './styles'
import { Navigate, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <Home_Container>
      <h2>Home aqui</h2>
      <div>
        <button onClick={() => navigate('/Dashboard')}>dashboard</button>
      </div>
    </Home_Container>
  )
}

export default Home
