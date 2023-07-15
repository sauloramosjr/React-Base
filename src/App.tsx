import { ThemeContextProvider } from '@contexts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { DarkTheme, LightTheme } from '@theme'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import GlobalStyle from './global.styles'
import { AppRoutes } from './routes'
import { Suspense } from 'react'

function App() {
  const queryClient = new QueryClient()
  const rotaServere = '/'

  const { ThemaProvider, toggleTheme } = ThemeContextProvider({
    customTheme: {
      light: LightTheme,
      dark: DarkTheme,
    },
    initialMode: 'light',
  })

  const isUsuarioLogado = () => {
    // Verifique se o usuário está logado ou não
    // Retorna true se estiver logado, false caso contrário
    return false // Altere essa lógica conforme suas necessidades
  }

  return (
    <>
      <ThemaProvider>
        <GlobalStyle />
        <SnackbarProvider
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          // autoHideDuration={3500}
          preventDuplicate
          dense
          maxSnack={3}
        />
        <QueryClientProvider client={queryClient}>
          <BrowserRouter basename={rotaServere}>
            <Suspense>
              <Routes>{AppRoutes.map(rotas => rotas)}</Routes>
            </Suspense>
          </BrowserRouter>
          {import.meta.env.VITE_DEV == 'true' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </QueryClientProvider>
      </ThemaProvider>
    </>
  )
}

export default App
