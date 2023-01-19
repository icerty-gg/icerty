import { useQuery } from 'react-query'

import { api } from '../utils/fetcher'

export const useOffers = () => {
  const {
    data: offers ,
    isError,
    isLoading
  } = useQuery({
    queryKey: ['offers'],
    queryFn: () => {
      try {
        return api.get('/offers/')
      } catch (err) {
        return null
      }
    },
    staleTime: Infinity
  })

  console.log(offers)

  return { offers, isLoading, isError }
}
