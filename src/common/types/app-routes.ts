import { LazyExoticComponent } from 'react'

export type TAppRoutes = {
  path: string
  element: LazyExoticComponent<any>
  title: string
  icon?: Element
  children?: TAppRoutes[]
}
