import React from 'react'
import { Dashboard_Container } from './styles'
import { Outlet, Route, Routes } from 'react-router-dom'

const Dashboard = () => {
  return (
    <Dashboard_Container>
      <Outlet />
    </Dashboard_Container>
  )
}

export default Dashboard
