'use client'

import { useEffect } from 'react'

import { Filter } from '../../components/filter/Filter'
import { SearchFilter } from '../../components/filter/SearchFilter'
import { Offer } from '../../components/offers/Offer'
import { Container } from '../../components/ui/Container'
import { EmptyContent } from '../../components/ui/EmptyContent'
import { Heading } from '../../components/ui/Heading'
import { Layout } from '../../components/ui/Layout'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useOffers } from '../../hooks/useOffers'
import { useParams } from '../../hooks/useParams'

const Offers = () => {
  const { categoryParams, searchParams, titleParams } = useParams()

  const { isFetching, isLoading, offers, refetch } = useOffers({
    take: 20,
    page: 1,
    order_direction: 'asc',
    order_by: 'createdAt',
    category: categoryParams ?? undefined,
    title: titleParams ?? undefined
  })

  useEffect(() => {
    if (searchParams) void refetch()
  }, [refetch, searchParams])

  return (
    <Layout>
      <div className='grid grid-rows-none max-lg:grid-cols-1 grid-cols-[1fr,_2fr] gap-4'>
        <Filter />

        <Container>
          <div className='flex items-center justify-center gap-4 pb-6'>
            <Heading title='Offers' />
            <SearchFilter />
          </div>
          {isLoading || isFetching ? (
            <div className='w-full flex items-center justify-center'>
              <LoadingSpinner size='w-10 h-10' />
            </div>
          ) : offers?.offers.length ? (
            <ul className='sticky grid grid-cols-1 gap-4 backdrop-blur'>
              {offers?.offers.map(o => {
                return <Offer key={o.id} {...o} />
              })}
            </ul>
          ) : (
            <EmptyContent />
          )}
        </Container>
      </div>
    </Layout>
  )
}

export default Offers
