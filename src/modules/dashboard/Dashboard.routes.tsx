import { Navigate, RouteObject } from 'react-router-dom'
import BemVindo from './bemVindo/BemVindo'
import Usuarios from './usuarios/Usuarios'

export const DashboardRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'Bem-Vindo'} />,
  },
  {
    path: 'Bem-Vindo',
    element: <BemVindo />,
  },
  {
    path: 'Usuarios',
    element: <Usuarios />,
  },
]
