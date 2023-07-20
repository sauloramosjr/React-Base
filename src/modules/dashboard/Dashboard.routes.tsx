import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const BemVindo = lazy(() => import('./bemVindo/BemVindo'))
const Usuario = lazy(() => import('./usuarios/Usuarios'))

const NotFound = lazy(() => import('../../common/components/notFound/NotFound'))

export const DashboardRoutes = (
  <Routes>
    <Route
      path=""
      index
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <BemVindo />
        </Suspense>
      }
    />
    <Route
      path="Usuarios"
      index
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <Usuario />
        </Suspense>
      }
    />
    <Route
      path="*"
      index
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <NotFound />
        </Suspense>
      }
    />
  </Routes>
)
