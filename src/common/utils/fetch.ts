import { UseMutationResult, useMutation, useQuery } from '@tanstack/react-query'
import {
  UseDeleteProps,
  UseGetProps,
  UsePatchProps,
  UsePostFormDataProps,
  UsePostProps,
  consulta,
} from '@types'
import axios, { AxiosRequestConfig } from 'axios'
import { useContext } from 'react'
import { storeContext } from '@contexts'

export type UseFetchProps = {
  useGet: UseGetProps
  useMutationPost: <TDataRetorno>(
    url: string,
    queryKey: string | string[],
    onSuccess?: () => void,
    onError?: (error: unknown) => void,
  ) => UseMutationResult<TDataRetorno, unknown, TDataRetorno, unknown>
  useMutationPatch: <TDataRetorno, TDTO>(
    url: string,
    queryKey: string | string[],
    onSuccess?: () => void,
    onError?: (error: unknown) => void,
  ) => UseMutationResult<TDataRetorno, TDataRetorno, void, unknown>
  useMutationPut: <TDTO, TData, TError>(
    url: string,
    queryKey: string | string[],
    onSuccess?: () => void,
    onError?: (error: unknown) => void,
  ) => UseMutationResult<TDTO, TData, TDTO, unknown>
  useMutatuionDelete: <TDataRetorno>(
    url: string,
    queryKey: string | string[],
    onSuccess?: () => void,
    onError?: (error: unknown) => void,
  ) => UseMutationResult<TDataRetorno, TDataRetorno, void, unknown>
}

export const UseFetch = () => {
  const context = useContext(storeContext)
  const bearerToken = context?.logado?.BearerToken
  const preConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: 'Bearer ' + bearerToken,
      'Useauth-Sistema': 5,
      'Useauth-Usuario': 'ADMUSEALL',
      'Useauth-Empresa': 1,
      'Useauth-Filial': 1,
    },
  }
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: preConfig.headers,
  })

  const useGet: UseGetProps = <TDataRetorno>(
    url: string,
    queryKey: string | string[],
    parametros?: consulta,
    enable?: boolean,
    initialData?: TDataRetorno,
    config?: AxiosRequestConfig<TDataRetorno>,
  ) => {
    let stringParameters = ''
    let _url = url

    if (parametros) {
      stringParameters = Object.entries(parametros)
        .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
        .join('&')

      if (stringParameters) {
        stringParameters = `?${stringParameters}`
      }

      _url += stringParameters
    }

    return useQuery({
      queryKey: [queryKey],
      queryFn: async () => {
        let response = {} as any
        try {
          response = await axiosInstance.get<TDataRetorno>(_url, {
            ...preConfig,
            ...config,
          })
        } catch (error: any) {
          response = { data: error.response.data }
        }
        return response
      },
      retry: 0,
      staleTime: Infinity,
      enabled: enable,
      initialData,
    })
  }

  const useMutationPost = <TDataRetorno, TDto>(
    url: string,
    queryKey: string | string[],
    onSuccess?: () => void,
    onError?: (error: unknown) => void,
  ) => {
    return useMutation<TDataRetorno, unknown, TDataRetorno>(
      async data => (await axiosInstance.post<TDataRetorno>(url, data)).data,
      {
        onSuccess,
        mutationKey: [queryKey], // Passa a queryKey como array
        onError,
      },
    )
  }

  const useMutationPatch = <TData, TError, TDTO>(
    url: string,
    queryKey: string | string[],
    onSuccess?: () => void,
    onError?: (error: unknown) => void,
  ) => {
    return useMutation<TData, TError, TDTO>(
      async data => (await axiosInstance.patch<TData>(url, data)).data,
      {
        onSuccess,
        mutationKey: [queryKey],
        onError,
      },
    )
  }
  const useMutationPut = <TDTO, TData, TError>(
    url: string,
    queryKey: string | string[],
    onSuccess?: () => void,
    onError?: (error: unknown) => void,
  ) => {
    return useMutation<TDTO, TData, TDTO>(
      async data => (await axiosInstance.put<TDTO>(url, data)).data,
      {
        onSuccess,
        mutationKey: [queryKey],
        onError,
      },
    )
  }

  const useMutatuionDelete = <TDataRetorno>(
    url: string,
    queryKey: string | string[],
    onSuccess?: () => void,
    onError?: (error: unknown) => void,
  ) => {
    return useMutation<TDataRetorno, TDataRetorno>(
      async () => (await axiosInstance.delete<TDataRetorno>(url)).data,
      {
        onSuccess,
        mutationKey: [queryKey],
        onError,
      },
    )
  }

  const UseFetch: UseFetchProps = {
    useGet,
    useMutationPatch,
    useMutationPost,
    useMutatuionDelete,
    useMutationPut,
  }
  return UseFetch
}
