import { DataSort, RequestReturn, filtro, pagination } from '@types'
import { ErrorToast, SuccessToast, UseFetch } from '@utils'
import { Dispatch, useContext, useMemo, useState } from 'react'
import { ThemeContext } from '../contexts/ThemaContext'

type crudProps = {
  url: string // colocar uma 'barra' ''/'' ao final da rota
  queryKey: string // 'NomeDoModulo_' + 'NomeDaTabela'
}

// export type PixelOrPercent = `${number}px` | `${number}%`

// export type Column<T = string> = {
//   nomeColuna: string | 'action'
//   apelidoColuna: string
//   width: PixelOrPercent
//   state: boolean
//   minWidth: PixelOrPercent
//   cellComponent?({ children }: React.PropsWithChildren): JSX.Element
//   bodyCell?: ({
//     children,
//     row,
//     linhasSelecionadas,
//     selecionaLinha,
//   }: React.PropsWithChildren<{
//     row?: any
//     linhasSelecionadas?: any[]
//     selecionaLinha?: 'uma' | 'multiplas'
//   }>) => JSX.Element
//   tipo?: {
//     number: (value: string) => number | boolean | undefined
//     float: (value: string) => `${number}.${number}` | boolean | undefined
//     icon: (value: string) => JSX.Element | boolean | undefined
//     link: string | undefined
//     phone: (value: string) => string | boolean | undefined
//     boolean: (value: string) => string | JSX.Element | boolean | undefined
//   }
// }

// export function getFieldsToDataFetch(columns: Column[]): string[] | undefined {
//   if (columns.length) {
//     return columns?.reduce<string[]>((tot, curr) => {
//       if (curr.state && curr.nomeColuna != 'action') {
//         tot.push(curr.nomeColuna)
//       }
//       return tot
//     }, [])
//   } else {
//     return []
//   }
// }

/**
 *
 * @param url string de rota base da api do crud  exemplo: 'http://localhost:3000/usuarios/'
 * @param queryKey string chave da chamada, sugestão: 'NomeDoModulo_' + 'NomeDaTabela'
 * @returns
 */
export const CrudService = <TData>({ url, queryKey }: crudProps) => {
  const { useGet, useMutationPost, useMutationPut, useMutationDelete } =
    UseFetch()

  return () => {
    const [permissaoListarTodos, setPermissaoListarTodos] = useState(false)
    const [permissaoListarUm, setPermissaoListarUm] = useState(false)
    const context = useContext(ThemeContext)
    const theme = context!.theme

    const [Id, setId] = useState('')
    const [queryKeyUnique, setQueryKeyUnique] = useState('')

    const [filters, setFilters] = useState<filtro[]>([])
    const [fields, setFields] = useState<string[]>([])
    const [pagination, setPagination] = useState<pagination>({
      limit: 25,
      page: 1,
      start: 0,
    })
    const [dataSort, setDataSort] = useState<DataSort>({
      direction: 'DEFAULT',
      property: 'Id',
      times: 0,
    })

    const parametrosListar = useMemo(() => {
      return {
        fields: fields,
        filter: filters,
        sort: [
          {
            property: dataSort.property,
            direction:
              dataSort.direction === 'DEFAULT' ? 'ASC' : dataSort.direction,
          },
        ],
        ...pagination,
      }
    }, [filters, pagination, dataSort])

    // GET TODOS
    const {
      data: requestReturnTodos,
      refetch: refetchTodos,
      isLoading: listarTodosIsLoading,
      isFetching: listarTodosIsFetching,
    } = useGet<RequestReturn<TData[]>>(
      url,
      [queryKey, 'getItems'],
      parametrosListar,
      permissaoListarTodos,
    )

    // GET UM
    const {
      data: requestReturnUm,
      isLoading: listarUmIsLoading,
      isFetching: listarUmIsFetching,
    } = useGet<RequestReturn<TData>>(
      url + Id,
      [queryKey, 'getItem'],
      parametrosListar,
      permissaoListarUm,
    )
    //

    // POST NOVO
    const {
      mutate: postMutate,
      data: postResult,
      isLoading: novoIsLoading,
    } = useMutationPost<TData>(url, [queryKey, 'newItem', queryKeyUnique])
    //

    // PUT ATUALIZAR
    const {
      mutate: putMutate,
      data: putResult,
      isLoading: atualizaIsLoading,
    } = useMutationPut<TData>(url + Id, [queryKey, 'attItem', queryKeyUnique])
    //

    // DELETE DELETAR
    const { mutate: delMutate, isLoading: deletaIsLoading } = useMutationDelete(
      url + Id,
      [queryKey, 'deleteItem', queryKeyUnique],
    )
    //

    const permitirListar = (
      dispatch: Dispatch<(value: boolean) => boolean>,
    ) => {
      dispatch(curr => !curr)
      setTimeout(() => {
        dispatch(curr => !curr)
      }, 200)
    }

    const listarTodos = () => {
      setPermissaoListarTodos(true)
    }

    const listarUm = (Id: string) => {
      setId(Id)
      permitirListar(setPermissaoListarUm)
    }

    const novo = (
      novoIncidente: TData,
      queryKey: string,
      success?: {
        message: string
        callBack?: () => void
      },
      error?: {
        message: string
        callBack?: (error?: unknown) => void
      },
    ) => {
      setQueryKeyUnique(queryKey)
      postMutate(novoIncidente, {
        onSuccess: () => {
          refetchTodos()
          SuccessToast(
            success?.message
              ? success.message
              : 'Item foi Adicionado com sucesso',
            crypto.randomUUID(),
            theme,
          )
          success?.callBack && success.callBack()
        },
        onError: err => {
          ErrorToast(
            error?.message ? error.message : 'Error ao tentar excluir',
            crypto.randomUUID(),
            theme,
          )
          error?.callBack && error?.callBack(err)
        },
      })

      return postResult
    }
    const atualiza = (
      atualizaIncidente: TData & { Id: string },
      queryKey: string,
      success?: {
        message: string
        callBack?: () => void
      },
      error?: {
        message: string
        callBack?: (error?: unknown) => void
      },
    ) => {
      setId(atualizaIncidente.Id)
      setQueryKeyUnique(queryKey)
      setTimeout(() => {
        putMutate(atualizaIncidente, {
          onSuccess: () => {
            refetchTodos()
            SuccessToast(
              success?.message
                ? success.message
                : 'Item foi atualizado com sucesso',
              crypto.randomUUID(),
              theme,
            )
            success?.callBack && success.callBack()
          },
          onError: err => {
            ErrorToast(
              error?.message ? error.message : 'Erro ao tentar excluir',
              crypto.randomUUID(),
              theme,
            )
            error?.callBack && error?.callBack(err)
          },
        })
      }, 200)
      return putResult
    }
    const deleta = (
      Id: string,
      success?: {
        message: string
        callBack?: () => void
      },
      error?: {
        message: string
        callBack?: (error?: unknown) => void
      },
    ) => {
      setId(Id)
      delMutate(Id, {
        onSuccess: () => {
          SuccessToast(
            success?.message ? success.message : 'Item excluido com sucesso',
            crypto.randomUUID(),
            theme,
          )
          refetchTodos()
          success?.callBack && success.callBack()
        },
        onError: err => {
          ErrorToast(
            error?.message ? error.message : 'Erro ao tentar excluir',
            crypto.randomUUID(),
            theme,
          )
          error?.callBack && error?.callBack(err)
        },
      })

      return putResult
    }

    const atualizaPaginacao = (paginacao: pagination) => {
      setPagination(paginacao)
      setTimeout(() => {
        refetchTodos()
      }, 5)
    }

    const loadingListarTodos = listarTodosIsLoading || listarTodosIsFetching
    const loadingListarUm = listarUmIsLoading || listarUmIsFetching
    const loadingNovo = novoIsLoading
    const loadingAtualiza = atualizaIsLoading
    const loadingDeleta = deletaIsLoading

    // getUmIsLoading ||
    // postIsLoading ||
    // putIsLoading ||
    // delIsLoading

    return {
      listarTodos,
      listarUm,
      responseTodos: requestReturnTodos?.data,
      responseUm: requestReturnUm?.data,
      setFields,
      setFilters,
      setDataSort,
      reloadTodos: refetchTodos,
      atualizaPaginacao,
      novo,
      atualiza,
      deleta,
      loadingListarTodos,
      loadingListarUm,
      loadingNovo,
      loadingAtualiza,
      loadingDeleta,
      parametrosListarTodos: parametrosListar,
    }
  }
}
