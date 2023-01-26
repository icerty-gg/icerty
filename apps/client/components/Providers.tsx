'use client'

import { isAxiosError } from 'axios'
import { QueryClient, QueryClientProvider } from 'react-query'

import type { ReactNode } from 'react'
import type { QueryOptions } from 'react-query'

const customRetry: QueryOptions['retry'] = (failureCount, error) => {
  if (failureCount > 3) {
    return false
  }

  if (!isAxiosError(error) || !error.response) {
    return true
  }

  if (error.response.status === 0 || error.response.status > 500) {
    return true
  }

  return false
}

export const Providers = ({ children }: { readonly children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: customRetry
      },
      mutations: {
        retry: customRetry
      }
    }
  })
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
