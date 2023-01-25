'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from 'react-query'

import { EmptyContent } from '../../../components/ui/EmptyContent'
import { FollowButton } from '../../../components/ui/FollowButton'
import { Heading } from '../../../components/ui/Heading'
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner'
import { api } from '../../../utils/fetcher'

export const Lists = () => {
  const { data: offers, isLoading } = useQuery({
    queryKey: ['followedOffers'],
    queryFn: () => api.get('/offers/', { queries: { followed: true } })
  })

  // const groupedByCategory = offers?.offers.reduce((acc, offer) => {
  //   acc[offer.category] ??= [];
  //   acc[offer.category].push(offer);
  //   return acc;
  // }, {});

  return (
    <div className='flex flex-col gap-4 items-center w-full h-full'>
      <div className='flex items-center gap-2'>
        <Heading title='Your lists' />
        {offers?.offers.length ? <p className=' text-white'>({offers?.offers.length})</p> : null}
      </div>

      <div className='w-full h-full flex items-center justify-center'>
        {isLoading ? (
          <LoadingSpinner size='w-10 h-10' />
        ) : !offers?.offers.length ? (
          <EmptyContent />
        ) : (
          <ul className='grid grid-cols-1 gap-4 w-full'>
            {offers?.offers.map(o => (
              <li
                key={o.id}
                className={clsx(
                  'flex items-center gap-6 border transition-colors bg-gray-800/20 border-slate-800 hover:bg-sky-800/10 rounded-xl relative'
                )}
              >
                <div className='relative w-full h-full'>
                  <Link href={`/offers/${o.id}`} className='flex items-center w-full h-full'>
                    <Image
                      width={210}
                      height={210}
                      src={o.image}
                      alt={o.name}
                      className='rounded-md object-cover max-md:max-w-[8rem] pointer-events-none min-h-[14rem] max-h-[14rem]'
                    />

                    <div className='realtive p-4'>
                      <div className='flex items-center justify-between w-full'>
                        <div className='text-white flex flex-col gap-2'>
                          <div className='flex items-center gap-4'>
                            <h3 className='line-clamp-none md:line-clamp-2 text-xl'>{o.name}</h3>
                          </div>
                          <p className='text-2xl font-bold text-white'>
                            {o.price} <span className='text-sm'>USD</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <FollowButton id={o.id} className='absolute top-4 right-4' />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
