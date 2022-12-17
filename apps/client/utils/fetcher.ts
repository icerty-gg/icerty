import { Fetcher } from 'openapi-typescript-fetch'

import type { paths } from '../apiTypes'

export const fetcher = Fetcher.for<paths>()

const apiUrl = process.env.NEXT_PUBLIC_API_URL

if (!apiUrl) {
  throw new Error('NEXT_PUBLIC_API_URL is not set!')
}

fetcher.configure({
  baseUrl: apiUrl
})
