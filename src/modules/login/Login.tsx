import React from 'react'
import { Login_Container } from './styles'

export const Login = () => {
  return (
    <Login_Container>
      <div>
        <h3>Login</h3>
        <form
          onSubmit={e => {
            e.preventDefault()
            console.log(e)
          }}>
          <div>
            <label htmlFor="Email">Email</label>
            <input type="text" name="Email" />
          </div>
          <div>
            <label htmlFor="Senha">Senha</label>
            <input type="text" name="Senha" />
          </div>
          <button type="submit">Logar</button>
        </form>
      </div>
    </Login_Container>
  )
}

export default Login
