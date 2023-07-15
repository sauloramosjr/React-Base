import { UseQueryResult } from '@tanstack/react-query'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

export type operator = 'equal' | 'containsall' | 'in'

export type filtro = {
  property: string
  value: string | [number]
  and: boolean
  not?: boolean
  operator: operator
}
export type pagination = {
  page: number
  start: number
  limit: number
}

export type consulta = {
  fields?: string[]
  includes?: string[]
  filter?: filtro[]
  sort?: Omit<DataSort, 'times'>[]
} & Partial<pagination>

export type DataSort = {
  property: string
  direction: 'ASC' | 'DESC' | 'DEFAULT'
  times?: number
}

export type UsePatchProps = <TDataRetorno, TDto>(
  url: string,
  queryKey: string | string[],
  executarQuery: boolean,
  dto: TDto,
  config?: AxiosRequestConfig,
  onSuccess?: () => void,
) => UseQueryResult<AxiosResponse<TDataRetorno, any>, unknown>

export type UsePostProps = <TDataRetorno, TDto>(
  url: string,
  queryKey: string | string[],
  executarQuery: boolean,
  dto: TDto,
  config?: AxiosRequestConfig,
  onSuccess?: () => void,
) => UseQueryResult<AxiosResponse<TDataRetorno, any>, unknown>

export type UsePostFormDataProps = <
  TDataRetorno,
  TDto extends Record<string, string>,
>(
  url: string,
  queryKey: string | string[],
  executarQuery: boolean,
  dto: TDto,
  config?: AxiosRequestConfig,
  onSuccess?: () => void,
) => UseQueryResult<AxiosResponse<TDataRetorno, any>, unknown>

export type UseGetProps = <TDataRetorno>(
  url: string,
  queryKey: string | string[],
  parametros?: consulta,
  enable?: boolean,
  initialData?: TDataRetorno,
  config?: AxiosRequestConfig<TDataRetorno>,
) => UseQueryResult<AxiosResponse<TDataRetorno, any>, unknown>

export type UseDeleteProps = <TDataRetorno>(
  url: string,
  id: string,
  queryKey: string | string[],
  enable?: boolean,
  config?: AxiosRequestConfig<TDataRetorno> | undefined,
) => UseQueryResult<AxiosResponse<TDataRetorno, any>, unknown>

export type MessageReturn = {
  Success: boolean
  Message: string
}
export type RequestReturn<T> = {
  Content?: T
  Total?: number
  CodeRequest?: number
} & MessageReturn
