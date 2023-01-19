'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { BiLocationPlus, BiCategoryAlt } from 'react-icons/bi'

import { FollowButton } from '../ui/FollowButton'

import type { Api } from '../../utils/fetcher'
import type { ZodiosResponseByPath } from '@zodios/core'

type Response = ZodiosResponseByPath<Api, 'get', '/offers/'>

export const Offer = ({
  category,
  city,
  id,
  images,
  isFollowed,
  isPromoted,
  name,
  price
}: Response['offers'][number]) => {
  return (
    <div className='relative'>
      <Link href={`/offers/${id}`}>
        <li
          className={clsx(
            'flex items-center gap-6 border transition-colors bg-gray-800/20 border-slate-800 hover:bg-sky-800/10 rounded-xl',
            isPromoted && 'border bg-sky-800/10 hover:bg-sky-800/20 border-sky-500/40'
          )}
        >
          <Image
            width={210}
            height={210}
            src={images[0]?.img}
            alt={name}
            className='rounded-md object-cover max-md:max-w-[8rem] pointer-events-none min-h-[14rem] max-h-[14rem]'
          />

          <div className='realtive p-4'>
            <div className='flex items-center justify-between w-full'>
              <div className='text-white flex flex-col gap-2'>
                <div className='flex items-center gap-4'>
                  <h3 className='line-clamp-none md:line-clamp-2 text-xl'>{name}</h3>
                  {isPromoted && (
                    <p className='py-2 px-4 border bg-sky-500/60 border-sky-500/90 rounded-full text-white text-sm max-lg:text-xs text-center z-10'>
                      Promoted offer
                    </p>
                  )}
                </div>
                <p className='text-2xl font-bold text-white'>
                  {price} <span className='text-sm'>USD</span>
                </p>
              </div>
            </div>

            <div className='absolute bottom-4 right-4 flex items-center gap-2'>
              <p className='flex items-center gap-2 text-sm text-sky-600 bg-sky-400/10 rounded-full py-2 px-4'>
                <BiCategoryAlt className='text-lg' /> {category.name}
              </p>

              <p className='flex items-center gap-2 text-sm text-sky-600 bg-sky-400/10 rounded-full py-2 px-4'>
                <BiLocationPlus className='text-lg' /> {city}
              </p>
            </div>
          </div>
        </li>
      </Link>
      <FollowButton id={id} className='absolute top-4 right-4' isFollowed={isFollowed} />
    </div>
  )
}
