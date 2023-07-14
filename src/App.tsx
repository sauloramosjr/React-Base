import { useState } from 'react'
import { ThemeContextProvider } from '@contexts'
import { LightTheme, DarkTheme } from '@theme'
import GlobalStyle from './global.styles'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SnackbarProvider } from 'notistack'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
            <Routes>
              <Route path={'/*'} element={<>Inicio da aplicação</>} />
            </Routes>
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
