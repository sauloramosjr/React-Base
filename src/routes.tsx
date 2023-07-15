import { lazy } from 'react'
import { Navigate, Route, RouteObject } from 'react-router-dom'
import { DashboardRoutes } from './modules/dashboard/Dashboard.routes'

const Home = lazy(() => import('./modules/home/Home').then(module => module))
const Dashboard = lazy(() =>
  import('./modules/dashboard/Dashboard').then(module => module),
)

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'/Bem-Vindo'} />,
  },
  {
    path: '/Bem-Vindo',
    element: <Home />,
  },
  {
    path: '/Dashboard',
    element: <Dashboard />,
    children: DashboardRoutes,
  },
  {
    path: '/*',
    element: <Navigate to={'Bem-Vindo'} />,
  },
]

export const generateRoutes = (_routes: RouteObject[]) => {
  return _routes.map(route => {
    if (route.children && route.children.length > 0) {
      // verifique se children existe e não é vazio
      return (
        <Route key={route.path} element={route.element}>
          {route.children.map(child => {
            return (
              <Route
                key={child.path}
                path={route.path + '/' + child.path}
                element={child.element}
              />
            )
          })}
        </Route>
      )
    }
    return <Route key={route.path} path={route.path} element={route.element} />
  })
}

export const AppRoutes = generateRoutes(routes)
