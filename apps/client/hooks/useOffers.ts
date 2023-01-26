'use client'

import { useQuery } from '@tanstack/react-query'

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
  readonly title?: string
}

export const useOffers = ({
  category,
  city,
  followed,
  order_by,
  order_direction,
  page,
  promoted,
  take,
  title
}: OffersParams) => {
  const {
    data: offers,
    isFetching,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['offers'],
    queryFn: () =>
      api.get('/offers/', {
        queries: {
          take: take,
          page: page,
          order_direction: order_direction,
          order_by: order_by,
          category: category,
          followed: followed,
          city: city,
          promoted: promoted,
          name: title
        }
      }),
    staleTime: 0,
    retry: 3
  })

  return { offers, isLoading, refetch, isFetching }
}
