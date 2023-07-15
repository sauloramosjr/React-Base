import { LoginResponse, Usuario } from '@interfaces'
import { createContext, useState } from 'react'

/**
 * Propriedades da store (estado global da aplicação).
 * @property usuario - O usuário atualmente logado.
 * @property tabsAbertas - As rotas de uso atualmente abertas.
 * @property snackMessage - A mensagem exibida no snack bar.
 * @property logado - As informações de login do usuário.
 * @property atualizaStore - Função para atualizar uma propriedade da store.
 */
export interface StoreProps {
  usuario: Usuario | null
  logado: LoginResponse | null

  atualizaStore: <T extends keyof StoreKeys>(
    propriedade: T,
    value: StoreProps[T],
  ) => void
}

/**
 * Tipos das propriedades da store.
 * @typeparam K - As chaves da store.
 */
type StoreKeys = {
  [K in keyof Omit<StoreProps, 'atualizaStore'>]: () => void
}

/**
 * Contexto da store.
 */
export const storeContext = createContext<StoreProps | null>(null)

/**
 * Provedor da store.
 * @param children - Os componentes filhos que serão envolvidos pelo provedor de contexto.
 * @returns O provedor da store que envolve os componentes filhos.
 */
export function StoreProvider({ children }: React.PropsWithChildren) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [logado, setLogado] = useState<LoginResponse | null>(null)

  /**
   * Função para atualizar uma propriedade da store.
   * @param propriedade - String com o nome da propriedade a ser atualizada.
   * @param value - O valor a ser atribuído à propriedade.
   */
  function atualizaStore<TStoreProp extends keyof StoreKeys>(
    propriedade: TStoreProp,
    value: StoreProps[TStoreProp],
  ) {
    const atualizaveis: StoreKeys = {
      usuario: () => setUsuario(value as typeof usuario),
      logado: () => {
        setLogado(value as typeof logado)
      },
    }
    atualizaveis[propriedade]()
  }

  const provide: StoreProps = {
    atualizaStore,
    usuario,
    logado,
  }

  return (
    <storeContext.Provider value={provide}>{children}</storeContext.Provider>
  )
}
