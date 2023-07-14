import { Thema } from '@interfaces'

export const DarkTheme: Thema = {
  palette: {
    mode: 'dark',
    header: {
      background:
        'linear-gradient(90deg, rgba(4,3,23,1) 0%, rgba(9,9,121,1) 76%, rgba(25,3,175,1) 100%)',
      logo: '#fff',
      texto: {
        color: '#fff',
      },
      icones: '#fff',
    },
    menuLateral: {
      background: '#fff',
      icones: {
        color: 'grey',
        size: '28px',
      },
    },
    tabs: {
      background: 'rgb(237, 236, 236)',
      iconeHome: {
        color: 'rgb(36, 152, 219)',
        size: '24px',
      },
    },
    primary: {
      main: { value: '#2393d4', contrastText: '#fff' },
      light: { value: '#2393d4', contrastText: '#fff' },
      dark: { value: '#253e6e', contrastText: '#fff' },
    },
    secondary: {
      main: { value: '#3b8a48', contrastText: '#fff' },
      light: { value: '#55835d', contrastText: '#fff' },
      dark: { value: '#1d4324', contrastText: '#fff' },
    },
    error: {
      main: { value: '#b74136', contrastText: '#fff' },
      light: { value: '#cb6b62', contrastText: '#fff' },
      dark: { value: '#832f27', contrastText: '#fff' },
    },
    warning: {
      main: { value: '#fb9703', contrastText: '#fff' },
      light: { value: '#f5a633', contrastText: '#fff' },
      dark: { value: '#b16b04', contrastText: '#fff' },
    },
    info: {
      main: { value: '#3b77a6', contrastText: '#fff' },
      light: { value: '#6496bb', contrastText: '#fff' },
      dark: { value: '#2b587b', contrastText: '#fff' },
    },
    success: {
      main: { value: '#6dbd70', contrastText: '#fff' },
      light: { value: '#73c376', contrastText: '#fff' },
      dark: { value: '#377b3a', contrastText: '#fff' },
    },
    divider: 'rgba(255,255,255,0.12)',
    action: {
      hover: 'rgba(0, 0, 0, 0.151)',
      disabled: '#b98e3c',
      selected: '#b98e3c',
    },
    grey: { '100': '#313131' },

    text: {
      primary: '#070d18',
      secondary: '#3b8a48',
    },
  },
  transitions: {
    buttom: '',
  },
}
