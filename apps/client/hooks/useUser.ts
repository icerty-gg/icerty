import { useQuery } from 'react-query'

import { api } from '../utils/fetcher'

export const useUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      try {
        return api.get('/sessions/me')
      } catch (err) {
        return null
      }
    },
    staleTime: Infinity,
    retry: false
  })

  return { user, isLoading }
}
