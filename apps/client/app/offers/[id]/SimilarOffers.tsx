'use client'

import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'

import { Offer } from '../../../components/offers/Offer'
import { PrimaryButton } from '../../../components/ui/primary-button/PrimaryButton'
import { SecondaryButton } from '../../../components/ui/secondary-button/SecondaryButton'
import { api } from '../../../utils/fetcher'

import { LoadingSpinner } from './../../../components/ui/LoadingSpinner'

export const SimilarOffers = ({ category }: { readonly category: string }) => {
  const [visibleOffers, setVisibleOffers] = useState(5)

  console.log(visibleOffers)

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['offers'],
    queryFn: () => api.get('/api/offers/', { queries: { take: visibleOffers } }),
    select(data) {
      return data.offers.filter(d => d.categoryName === category)
    }
  })

  useEffect(() => void refetch(), [refetch, visibleOffers])

  if (isLoading) return <p>Loading...</p>

  if (isError) return <p>An error occured</p>

  return (
    <ul className='grid grid-cols-1 gap-4'>
      {data?.map(o => {
        return <Offer key={o.id} {...o} />
      })}

      <PrimaryButton
        onClick={() => {
          setVisibleOffers(p => p + 5)
        }}
      >
        {isLoading ? <LoadingSpinner size='w-[18px] h-[18px]' /> : <p>Show more</p>}
      </PrimaryButton>

      <SecondaryButton href='/offers'>All offers</SecondaryButton>
    </ul>
  )
}
