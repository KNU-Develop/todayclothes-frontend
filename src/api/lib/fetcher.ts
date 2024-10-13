'use client'

import { setAccessToken } from '@/redux/slice/Login'

import { QueryClient } from '@tanstack/react-query'

import { ACCESS_TOKEN_HEADER_KEY } from '../constants/header-key'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:8080'

export class Fetcher {
  private baseUrl: string

  private unAuthorizedHandler: () => void = () => {}

  private tokenRefreshHandler: (access: string, refresh: string) => void =
    async () => {}

  private errorHandler: (error: Error) => void = () => {}

  public constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  public setErrorHandler(handler: (error: Error) => void) {
    this.errorHandler = handler
  }

  public setTokenRefreshHandler(
    handler: (access: string, refresh: string) => void,
  ) {
    this.tokenRefreshHandler = handler
  }

  public setUnAuthorizedHandler(handler: () => void) {
    this.unAuthorizedHandler = handler
  }

  private async request<ResponseType>(
    url: string,
    options?: RequestInit,
  ): Promise<ResponseType> {
    let data = null

    try {
      const fetchOptions: RequestInit = {
        ...options,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      }

      // const response = await fetch(`${this.baseUrl}${url}`, fetchOptions)
      const response = await fetch(`/api${url}`, fetchOptions)

      if (response.ok) {
        data = (await response.json()) as Promise<ResponseType>
      } else {
        const error = (await response.json()) as { code: string }
        throw new Error(error.code)
      }
    } catch (error) {
      console.error(error)
      this.errorHandler(error as Error)
      throw error
    }

    return data
  }

  private async authRequest<ResponseType>(
    url: string,
    client: QueryClient,
    access: string | null,
    refresh: string | null,
    dispatch: any,
    options?: RequestInit,
    retry: boolean = false,
  ): Promise<ResponseType> {
    let data = null

    if (!access && !refresh && global.window !== undefined) {
      this.unAuthorizedHandler()
    }

    if (!access && refresh) {
      await this.generateNewAccessToken(refresh, dispatch)
    }

    try {
      const fetchOptions: RequestInit = {
        ...options,
        headers: {
          [ACCESS_TOKEN_HEADER_KEY]: `Bearer ${access}`,
          Accept: 'application/json',
          ...(options?.body instanceof FormData
            ? {}
            : { 'Content-Type': 'application/json' }),
        },
      }

      // const response = await fetch(`${this.baseUrl}${url}`, fetchOptions)
      const response = await fetch(`/api${url}`, fetchOptions)

      console.log(`Bearer ${access}`)

      if (response.status === 401) {
        if (retry) {
          throw new Error('생성된 토큰이 비정상적입니다! 다시 로그인해주세요')
        }

        await this.generateNewAccessToken(refresh!, dispatch)
        return this.authRequest<ResponseType>(
          url,
          client,
          access,
          refresh,
          dispatch,
          options,
          true,
        )
      }

      if (response.ok) {
        data = (await response.json()) as Promise<ResponseType>
      } else {
        const error = (await response.json()) as { code: string }
        throw new Error(error.code)
      }
    } catch (error) {
      console.error(error)
      this.errorHandler(error as Error)
      throw error
    }

    return data
  }

  private generateNewAccessToken = async (refresh: string, dispatch: any) => {
    let data = null

    try {
      const res = await fetch(`${API_URL}/reissue`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          [ACCESS_TOKEN_HEADER_KEY]: `Bearer ${refresh}`,
        },
      })

      if (res.ok) {
        data = await res.json()
      } else {
        const error = await res.json()
        throw new Error(error.code)
      }

      const newAccessToken = data?.result?.accessToken
      // const newAccessToken = res.headers.get(ACCESS_TOKEN_HEADER_KEY)
      // const newRefreshToken = res.headers.get(REFRESH_TOKEN_HEADER_KEY)

      if (!newAccessToken) {
        throw new Error('토큰 갱신에 실패하였습니다.')
      }

      dispatch(setAccessToken(newAccessToken))
    } catch {
      if (global.location) {
        global.location.href = '/login'
      }
      this.unAuthorizedHandler()
    }
  }

  public async get<ResponseType>(url: string, options?: RequestInit) {
    return this.request<ResponseType>(url, options)
  }

  public async authGet<ResponseType>(
    url: string,
    client: QueryClient,
    access: string | null,
    refresh: string | null,
    dispatch: any,
    options?: RequestInit,
  ) {
    return this.authRequest<ResponseType>(
      url,
      client,
      access,
      refresh,
      dispatch,
      options,
    )
  }

  public async post<ResponseType>(url: string, options?: RequestInit) {
    return this.request<ResponseType>(url, {
      method: 'POST',
      ...options,
    })
  }

  public async authPost<ResponseType>(
    url: string,
    client: QueryClient,
    access: string | null,
    refresh: string | null,
    dispatch: any,
    options?: RequestInit,
  ) {
    return this.authRequest<ResponseType>(
      url,
      client,
      access,
      refresh,
      dispatch,
      {
        method: 'POST',
        ...options,
      },
    )
  }

  public async put<ResponseType = Error>(url: string, options?: RequestInit) {
    return this.request<ResponseType>(url, {
      method: 'PUT',
      ...options,
    })
  }

  public async authPut<ResponseType = Error>(
    url: string,
    client: QueryClient,
    access: string | null,
    refresh: string | null,
    dispatch: any,
    options?: RequestInit,
  ) {
    return this.authRequest<ResponseType>(
      url,
      client,
      access,
      refresh,
      dispatch,
      {
        method: 'PUT',
        ...options,
      },
    )
  }

  public async patch<ResponseType = Error>(url: string, options?: RequestInit) {
    return this.request<ResponseType>(url, {
      method: 'PATCH',
      ...options,
    })
  }

  public async authPatch<ResponseType = Error>(
    url: string,
    client: QueryClient,
    access: string | null,
    refresh: string | null,
    dispatch: any,
    options?: RequestInit,
  ) {
    return this.authRequest<ResponseType>(
      url,
      client,
      access,
      refresh,
      dispatch,
      {
        method: 'PATCH',
        ...options,
      },
    )
  }

  public async delete<ResponseType = Error>(
    url: string,
    options?: RequestInit,
  ) {
    return this.request<ResponseType>(url, {
      method: 'DELETE',
      ...options,
    })
  }

  public async authDelete<ResponseType = Error>(
    url: string,
    client: QueryClient,
    access: string | null,
    refresh: string | null,
    dispatch: any,
    options?: RequestInit,
  ) {
    return this.authRequest<ResponseType>(
      url,
      client,
      access,
      refresh,
      dispatch,
      {
        method: 'DELETE',
        ...options,
      },
    )
  }
}

export const baseFetcher = new Fetcher(API_URL)

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export class API {
  private readonly method: Method

  private readonly url: string

  private queryClient?: QueryClient

  private isAuth = false

  private accessToken: string | null

  private refreshToken: string | null

  private dispatch: any

  public constructor(
    method: Method,
    url: string,
    isAuth = false,
    accessToken: string | null,
    refreshToken: string | null,
    dispatch: any,
  ) {
    this.method = method
    this.url = url
    this.isAuth = isAuth
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.dispatch = dispatch
  }

  public setQueryClient(client: QueryClient) {
    this.queryClient = client
    return this
  }

  public setAuth(isAuth: boolean) {
    this.isAuth = isAuth
    return this
  }

  public setReduxDispatch(
    accessToken: string | null,
    refreshToken: string | null,
    dispatch: any,
  ) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.dispatch = dispatch
    return this
  }

  private async authRequest<ResponseType>(options?: RequestInit) {
    if (!this.queryClient) {
      throw new Error('QueryClient is not set')
    }
    switch (this.method) {
      case 'GET':
        return baseFetcher.authGet<ResponseType>(
          this.url,
          this.queryClient,
          this.accessToken,
          this.refreshToken,
          this.dispatch,
          options,
        )
      case 'POST':
        return baseFetcher.authPost<ResponseType>(
          this.url,
          this.queryClient,
          this.accessToken,
          this.refreshToken,
          this.dispatch,
          options,
        )
      case 'PUT':
        return baseFetcher.authPut<ResponseType>(
          this.url,
          this.queryClient,
          this.accessToken,
          this.refreshToken,
          this.dispatch,
          options,
        )
      case 'PATCH':
        return baseFetcher.authPatch<ResponseType>(
          this.url,
          this.queryClient,
          this.accessToken,
          this.refreshToken,
          this.dispatch,
          options,
        )
      case 'DELETE':
        return baseFetcher.authDelete<ResponseType>(
          this.url,
          this.queryClient,
          this.accessToken,
          this.refreshToken,
          this.dispatch,
          options,
        )
      default:
        throw new Error('Method not allowed')
    }
  }

  public call<T>(options?: RequestInit): Promise<T> {
    if (this.isAuth) {
      return this.authRequest<T>(options)
    }

    switch (this.method) {
      case 'GET':
        return baseFetcher.get<T>(this.url, options)
      case 'POST':
        return baseFetcher.post<T>(this.url, options)
      case 'PUT':
        return baseFetcher.put<T>(this.url, options)
      case 'PATCH':
        return baseFetcher.patch<T>(this.url, options)
      case 'DELETE':
        return baseFetcher.delete<T>(this.url, options)
      default:
        throw new Error('Method not allowed')
    }
  }
}

export class APIBuilder {
  private api: API

  public static get(url: string) {
    return new APIBuilder('GET', url)
  }

  public static post(url: string) {
    return new APIBuilder('POST', url)
  }

  public static put(url: string) {
    return new APIBuilder('PUT', url)
  }

  public static patch(url: string) {
    return new APIBuilder('PATCH', url)
  }

  public static delete(url: string) {
    return new APIBuilder('DELETE', url)
  }

  private constructor(method: Method, url: string) {
    this.api = new API(method, url, false, '', '', '')
  }

  public withCredentials(
    queryClient: QueryClient,
    accessToken: string | null,
    refreshToken: string | null,
    dispatch: any,
  ) {
    this.api
      .setQueryClient(queryClient)
      .setAuth(true)
      .setReduxDispatch(accessToken, refreshToken, dispatch)
    return this
  }
  public build() {
    return this.api
  }
}
