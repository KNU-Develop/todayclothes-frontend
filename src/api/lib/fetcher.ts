'use client'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:8080'

export class Fetcher {
  private baseUrl: string

  private errorHandler: (error: Error) => void = () => {}

  public constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  public setErrorHandler(handler: (error: Error) => void) {
    this.errorHandler = handler
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

      const response = await fetch(`${this.baseUrl}${url}`, fetchOptions)
      // const response = await fetch(url, fetchOptions)

      if (response.ok) {
        data = (await response.json()) as Promise<ResponseType>
      } else {
        const error = (await response.json()) as { code: string }
        throw new Error(error.code)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      this.errorHandler(error as Error)
      throw error
    }

    return data
  }

  public async get<ResponseType>(url: string, options?: RequestInit) {
    return this.request<ResponseType>(url, options)
  }

  public async post<ResponseType>(url: string, options?: RequestInit) {
    return this.request<ResponseType>(url, {
      method: 'POST',
      ...options,
    })
  }

  public async put<ResponseType = Error>(url: string, options?: RequestInit) {
    return this.request<ResponseType>(url, {
      method: 'PUT',
      ...options,
    })
  }

  public async patch<ResponseType = Error>(url: string, options?: RequestInit) {
    return this.request<ResponseType>(url, {
      method: 'PATCH',
      ...options,
    })
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
}

export const baseFetcher = new Fetcher(API_URL)

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export class API {
  private readonly method: Method

  private readonly url: string

  public constructor(method: Method, url: string, isAuth = false) {
    this.method = method
    this.url = url
  }

  public call<T>(options?: RequestInit): Promise<T> {
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
    this.api = new API(method, url)
  }

  public build() {
    return this.api
  }
}
