import React, { lazy, Suspense } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'

// Defina um componente para as rotas privadas que redirecionará para a página de login caso o usuário não esteja autenticado
interface PrivateRouteProps {
  element: React.ReactNode
  isAuthenticated: boolean
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  isAuthenticated,
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/Login" />
  }

  return <>{element}</>
}

// Defina uma função para verificar se o usuário está autenticado (você pode implementar essa lógica adequadamente)
const checkAuthentication = () => {
  // Exemplo: verifique se o usuário está autenticado
  // Substitua a lógica abaixo com a sua própria verificação de autenticação
  return true // ou true, dependendo da lógica de autenticação
}

// Elementos Lazy para carregamento dinâmico dos componentes das rotas
const Home = lazy(() => import('./modules/home/Home'))
const Login = lazy(() => import('./modules/login/Login'))
const Dashboard = lazy(() => import('./modules/dashboard/Dashboard'))
const NotFound = lazy(() => import('./common/components/notFound/NotFound'))

const App: React.FC = () => {
  // Verifique a autenticação do usuário
  const isAuthenticated = checkAuthentication()

  return (
    <>
      <Routes>
        {/* Rota Padrão */}
        <Route
          path=""
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
        />

        {/* Rota de Login */}
        <Route
          path="Login"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          }
        />

        {/* Rota de Dashboard, usando a rota privada */}
        <Route
          path="Dashboard/*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PrivateRoute
                element={<Dashboard />}
                isAuthenticated={isAuthenticated}
              />
            </Suspense>
          }></Route>

        {/* Rota NotFound */}
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </>
  )
}

export default App
