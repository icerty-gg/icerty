'use client'

import clsx from 'clsx'
import { CiSearch } from 'react-icons/ci'

import { Filter } from '../../components/filter/Filter'
import { Offer } from '../../components/offers/Offer'
import { Container } from '../../components/ui/Container'
import { Heading } from '../../components/ui/Heading'
import { Layout } from '../../components/ui/Layout'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useOffers } from '../../hooks/useOffers'

import type { ChangeEvent } from 'react'

const Offers = () => {
  const { isLoading, offers } = useOffers({ take: 20, page: 1, order_direction: 'asc', order_by: 'createdAt' })

  const onSearchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value

    console.log(text)
  }

  return (
    <Layout>
      <div className='grid grid-rows-none max-lg:grid-cols-1 grid-cols-[1fr,_2fr] gap-4'>
        {/* @ts-expect-error */}
        <Filter />

        <Container>
          <div className='flex items-center justify-center gap-4 pb-6'>
            <Heading title='Offers' />
            <div className='flex relative items-center w-full'>
              <input
                id='searchInput'
                type='search'
                placeholder='Everywhere'
                className={clsx(
                  'border bg-gray-800/20 border-slate-800 hover:border-sky-400/20 rounded-full p-4 focus:outline-none focus:border-sky-400/20 text-white pl-12 w-full'
                )}
                onChange={onSearchChangeHandler}
              />
              <label htmlFor='searchInput' className='absolute left-4'>
                <CiSearch className='text-white text-xl' />
              </label>
            </div>
          </div>

          {isLoading ? (
            <LoadingSpinner size='w-10 h-10' />
          ) : (
            <ul className='sticky grid grid-cols-1 gap-4 backdrop-blur'>
              {offers?.offers.map(o => {
                return <Offer key={o.id} {...o} />
              })}
            </ul>
          )}
        </Container>
      </div>
    </Layout>
  )
}

export default Offers
