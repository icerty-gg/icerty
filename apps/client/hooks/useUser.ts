import { useQuery } from '@tanstack/react-query'

import { api } from '../utils/fetcher'

export const useUser = () => {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      try {
        return api.get('/sessions/me')
      } catch (err) {
        return null
      }
    },
    staleTime: Infinity
  })

  return { user }
}
