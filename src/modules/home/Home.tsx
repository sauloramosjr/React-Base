import { useNavigate } from 'react-router-dom'
import { Home_Container } from './styles'

const Home = () => {
  const navigate = useNavigate()
  return (
    <Home_Container>
      <h2>Home aqui</h2>
      <div>
        <button onClick={() => navigate('/Dashboard')}>Dashboard</button>
        <button onClick={() => navigate('/Login')}>Login</button>
      </div>
    </Home_Container>
  )
}

export default Home
