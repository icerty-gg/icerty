import ky from 'ky-universal'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

if (!apiUrl) {
  throw new Error('NEXT_PUBLIC_API_URL is not set!')
}

export const api = ky.create({ prefixUrl: apiUrl })
