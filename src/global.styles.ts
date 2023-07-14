import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
 * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    border: none;

    outline: none;
  }
  *:focus-visible {
    outline-color: blue;
    outline-width: 0.5px;
    outline-style: solid;
    transition: outline 0.5s ease-in-out;
  }
  .color-{
    &primary-{
      &main{
        color:${({ theme }) => theme.palette.primary.main.value}

      }
      &light{
        color:${({ theme }) => theme.palette.primary.light.value}

      }
      &dark{
        color:${({ theme }) => theme.palette.primary.dark.value}

      }
    }

  }
  
  
  
  .size-500{
    font-size: 26px;
  }
  .underline{
    text-decoration:underline
  }
 
  /* Adicione aqui suas outras estilizações globais */
`

export default GlobalStyle
