import { useQuery } from '@tanstack/react-query'

import { api } from '../utils/fetcher'

export const useUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      try {
        return api.get('/api/sessions/me')
      } catch (err) {
        return null
      }
    },
    staleTime: Infinity,
    retry: false
  })

  return { user, isLoading }
}
