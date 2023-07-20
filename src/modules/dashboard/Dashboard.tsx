import { lazy } from 'react'
import { Outlet } from 'react-router-dom'
import { DashboardRoutes } from './Dashboard.routes'

const Dashboard = () => {
  return (
    <>
      {/* Rotas filhas de Dashboard */}
      {DashboardRoutes}
      {/* Rotas filhas de Dashboard */}

      <Outlet></Outlet>
    </>
  )
}

export default Dashboard
