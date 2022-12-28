'use client'

import Image from 'next/image'
import Link from 'next/link'
import { BiHeart, BiLocationPlus, BiCategoryAlt } from 'react-icons/bi'

interface Props {
  readonly city: string
  readonly id: string
  readonly image: any
  readonly isPromoted: boolean
  readonly name: string
  readonly price: number
}

export const Offer = ({ city, id, image, isPromoted, name, price }: Props) => {
  return (
    <div className='relative'>
      <Link href={`/offers/${id}`}>
        <li className='flex items-center gap-6 border transition-colors bg-gray-800/20 border-slate-800 hover:bg-sky-800/10 rounded-xl overflow-hidden'>
          <Image
            width={210}
            height={210}
            src={image}
            alt={name}
            className='rounded-md object-cover max-md:max-w-[8rem] pointer-events-none'
          />

          <div className='realtive p-4'>
            <div className='flex items-center justify-between w-full'>
              <div className='text-white flex flex-col gap-2'>
                <h3 className='line-clamp-none md:line-clamp-2 text-xl'>{name}</h3>
                <p className='text-2xl font-bold text-white'>
                  {price} <span className='text-sm'>USD</span>
                </p>
              </div>
            </div>

            <div className='absolute bottom-4 right-4 flex items-center gap-2'>
              <p className=' flex items-center gap-2 text-sm text-sky-600 bg-sky-400/10 rounded-full py-2 px-4'>
                <BiCategoryAlt className='text-lg' /> Furniture
              </p>

              <p className=' flex items-center gap-2 text-sm text-sky-600 bg-sky-400/10 rounded-full py-2 px-4'>
                <BiLocationPlus className='text-lg' /> {city}
              </p>
            </div>

            {isPromoted && (
              <h3 className='absolute -top-2 -right-2 py-2 px-4 bg-sky-500 rounded-full text-white text-sm max-lg:text-xs text-center'>
                Promoted offer
              </h3>
            )}
          </div>
        </li>
      </Link>
      <button
        onClick={() => console.log(id)}
        className='absolute top-4 right-4 flex items-center justify-center rounded-full p-2 text-sky-600 border bg-sky-400/10 border-slate-800 hover:bg-sky-400/20 hover:border-sky-500 transition-all'
      >
        <BiHeart className='text-lg' />
      </button>
    </div>
  )
}
