import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'

type CustomFetchOptions<T> = UseFetchOptions<T> & {
  excludeInterceptor?: number[]
}

export function useHttp<T>(url: string, opts: CustomFetchOptions<T> = {}) {
  const { excludeInterceptor, ...options } = opts
  const defaults: UseFetchOptions<T> = {
    async onRequest({ options }) {
      options.headers = new Headers(options.headers) || {}
      options.headers.set('X-Requested-With', 'XMLHttpRequest')
    },
    // onResponse({ response }) {
    //   if (process.server)
    //     console.log('useApi onResponse', response._data)
    // },
    async onResponseError({ response }) {
      // if (process.server)
      //   console.log('useApi onResponseError', response._data)

      const excludedInterceptor = (statusCode: number): boolean => {
        if (!excludeInterceptor) return false
        return excludeInterceptor.includes(statusCode)
      }
      if (!excludedInterceptor(response._data.code)) {
        // error toast
      }
    },
  }

  const params = defu(options, defaults)
  return useFetch(url, params)
}
