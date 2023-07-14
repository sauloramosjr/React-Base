import { ReactNode, createContext, useEffect, useMemo, useState } from 'react'
import { DarkTheme, LightTheme } from '@theme'
import { Thema } from '@interfaces'
import { ThemeProvider } from 'styled-components'

type ThemeContextProps =
  | {
      theme: Thema
      toggleTheme: () => void
    }
  | undefined

export const ThemeContext = createContext<ThemeContextProps>({
  theme: LightTheme,
  toggleTheme: () => {
    return
  },
})

export const ThemeContextProvider = ({
  customTheme,
  initialMode = 'light',
}: {
  customTheme?: {
    light: Thema
    dark?: Thema
  }
  initialMode?: 'light' | 'dark'
}): {
  ThemaProvider: ({ children }: { children: ReactNode }) => JSX.Element
  toggleTheme: () => void
} => {
  const [mode, setMode] = useState(initialMode)
  const [theme, setTheme] = useState(configInitialState())

  function changeThema() {
    if (mode === 'dark') {
      if (customTheme?.light) {
        setTheme(customTheme.light)
        return
      }
      setTheme(LightTheme)
      return
    }
    if (mode === 'light') {
      if (customTheme?.dark) {
        setTheme(customTheme.dark)
        return
      }
      setTheme(DarkTheme)
      return
    }
  }

  function configInitialState() {
    if (mode === 'dark') {
      if (customTheme?.dark) {
        return customTheme.dark
      }
      return DarkTheme
    }
    if (mode === 'light') {
      if (customTheme?.light) {
        return customTheme.light
      }
      return LightTheme
    }
    return LightTheme
  }

  function toggleTheme() {
    if (mode === 'dark') {
      setMode('light')
    } else {
      setMode('dark')
    }
    changeThema()
  }

  function ThemaProvider({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

  const provide = useMemo(() => {
    return {
      ThemaProvider,
      toggleTheme,
    }
  }, [theme])

  return provide
}
