import { closeSnackbar, enqueueSnackbar } from 'notistack'
import { Thema } from '../interfaces/Thema'
export function SuccessToast(
  message: string,
  key: string,
  theme: Thema,
  Icone?: () => JSX.Element,
) {
  enqueueSnackbar(message, {
    variant: 'success',
    style: { background: theme.palette.success.light.value },
    key,
    action: () => {
      return (
        <button
          style={{ background: 'transparent', cursor: 'pointer' }}
          onClick={() => closeSnackbar(key)}>
          {Icone ? <Icone /> : <>&#10006;</>}
        </button>
      )
    },
  })
}

export function ErrorToast(
  message: any,
  key: string,
  theme: Thema,
  Icone?: () => JSX.Element,
) {
  enqueueSnackbar(message, {
    variant: 'error',
    style: { background: theme.palette.error.main.value },
    autoHideDuration: 7000,
    key,
    action: () => {
      return (
        <button
          style={{ background: 'transparent', cursor: 'pointer' }}
          onClick={() => closeSnackbar(key)}>
          {Icone ? <Icone /> : <>&#10006;</>}
        </button>
      )
    },
  })
}
