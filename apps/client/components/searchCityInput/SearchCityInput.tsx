'use client'

import clsx from 'clsx'
import { useState } from 'react'
import { BiLocationPlus } from 'react-icons/bi'

import { api } from '../../utils/fetcher'

import type { ChangeEvent } from 'react'

interface Props {
  readonly className?: string
}

export const SearchCityInput = ({ className }: Props) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const [cities, setCities] = useState<readonly string[]>([])

  const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { data: offers } = await api.get('/offers/', { queries: { city: e.target.value } })

    setCities(offers.map(o => o.city))

    // jak na razie tu wyświetlamy wszystkie miasta z ofert czyli jak jest oferta która ma miasto Katowice to tu będą Katowice inaczej ich nie będzie
  }

  return (
    <div className='flex relative items-center w-full'>
      <input
        type='search'
        placeholder='Everywhere'
        className={clsx(
          'border bg-gray-800/20 border-slate-800 hover:border-sky-400/20 rounded-full p-4 focus:outline-none focus:border-sky-400/20 text-white pl-12 w-full',
          className
        )}
        onChange={onInputChange}
        onFocus={() => setIsOpenDropdown(true)}
        onBlur={() => setTimeout(() => setIsOpenDropdown(false), 100)}
      />
      <BiLocationPlus className='absolute left-4 text-white text-xl' />

      <div
        className={`absolute bg-gray-800 overflow-hidden w-full top-[100%] left-0 rounded-xl ${
          isOpenDropdown ? 'grid' : 'hidden'
        }`}
      >
        <ul className={`grid grid-cols-1 max-h-[15rem] overflow-y-auto overflow-hidden text-white z-20`}>
          {cities.map(c => (
            <li className='hover:bg-gray-700 text-center cursor-pointer' key={c}>
              <button className='w-full h-full p-4'>{c}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
