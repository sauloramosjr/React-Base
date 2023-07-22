import { UseMutationResult, useMutation, useQuery } from '@tanstack/react-query'
import {
  RequestReturn,
  UseDeleteProps,
  UseGetProps,
  UsePatchProps,
  UsePostFormDataProps,
  UsePostProps,
  consulta,
} from '@types'
import axios, { AxiosRequestConfig } from 'axios'
import { useContext } from 'react'
import { storeContext } from '../contexts/Store'
export type successFunction = () => void

export type UseFetchProps = {
  useGet: UseGetProps
  useMutationPost: <TData>(
    url: string,
    queryKey: string[],
    onSuccess?: successFunction | undefined,
    onError?: ((error: unknown) => void) | undefined,
  ) => UseMutationResult<TData, unknown, any, unknown>
  useMutationPatch: <TData>(
    url: string,
    queryKey: string[],
    onSuccess?: successFunction | undefined,
    onError?: ((error: unknown) => void) | undefined,
  ) => UseMutationResult<TData, unknown, any, unknown>
  useMutationPut: <TData>(
    url: string,
    queryKey: string[],
    onSuccess?: successFunction | undefined,
    onError?: ((error: unknown) => void) | undefined,
  ) => UseMutationResult<TData, unknown, any, unknown>
  useMutationDelete: <Tdata>(
    url: string,
    queryKey: string[],
    onSuccess?: successFunction | undefined,
    onError?: ((error: unknown) => void) | undefined,
  ) => UseMutationResult<any, unknown, any, unknown>
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
    queryKey: string[],
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
      queryKey: queryKey,
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
      enabled: enable === false ? false : true,
      initialData,
    })
  }

  const useMutationPost = <TData>(
    url: string,
    queryKey: string[],
    onSuccess?: successFunction,
    onError?: (error: unknown) => void,
  ) => {
    return useMutation(
      async data => (await axiosInstance.post<TData>(url, data)).data,
      {
        onSuccess,
        mutationKey: queryKey, // Passa a queryKey como array
        onError,
      },
    )
  }

  const useMutationPatch = <TData>(
    url: string,
    queryKey: string[],
    onSuccess?: successFunction,
    onError?: (error: unknown) => void,
  ) => {
    return useMutation(
      async data => (await axiosInstance.patch<TData>(url, data)).data,
      {
        onSuccess,
        mutationKey: [queryKey],
        onError,
      },
    )
  }
  const useMutationPut = <TData>(
    url: string,
    queryKey: string[],
    onSuccess?: successFunction,
    onError?: (error: unknown) => void,
  ) => {
    return useMutation(
      async data => (await axiosInstance.put<TData>(url, data)).data,
      {
        onSuccess,
        mutationKey: [queryKey],
        onError,
      },
    )
  }

  const useMutationDelete = <Tdata>(
    url: string,
    queryKey: string[],
    onSuccess?: successFunction,
    onError?: (error: unknown) => void,
  ) => {
    return useMutation(async () => (await axiosInstance.delete(url)).data, {
      onSuccess,
      mutationKey: [queryKey],
      onError,
    })
  }

  const UseFetch: UseFetchProps = {
    useGet,
    useMutationPatch,
    useMutationPost,
    useMutationDelete,
    useMutationPut,
  }
  return UseFetch
}
