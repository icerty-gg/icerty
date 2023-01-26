'use client'

import { useQuery } from 'react-query'

import { api } from '../utils/fetcher'

interface OffersParams {
  readonly category?: string
  readonly city?: string
  readonly followed?: boolean
  readonly order_by: 'createdAt' | 'price' | undefined
  readonly order_direction: 'asc' | 'desc' | undefined
  readonly page: number
  readonly promoted?: boolean
  readonly take: number
}

export const useOffers = ({
  category,
  city,
  followed,
  order_by,
  order_direction,
  page,
  promoted,
  take
}: OffersParams) => {
  const { data: offers, isLoading } = useQuery({
    queryKey: ['offers'],
    queryFn: () =>
      api.get('/api/offers/', {
        queries: {
          take: take,
          page: page,
          order_direction: order_direction,
          order_by: order_by,
          category,
          followed,
          city,
          promoted
        }
      }),
    staleTime: 12000,
    retry: 3
  })

  return { offers, isLoading }
}
