'use client'

import React, { useState, useRef, useEffect } from 'react'
import { BiLocationPlus } from 'react-icons/bi'

import { SearchItem } from './SearchItem'
import { cities } from './cities'

export const SearchCityInput = () => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const listOfCitiesRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: React.MouseEvent) => {

      if (listOfCitiesRef.current?.contains(event.target)) {
        setIsOpenDropdown(false)
        console.log('trybi')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className='flex relative items-center w-full'>
      <input
        type='search'
        placeholder='Cała Polska'
        className='border bg-gray-800/20 border-slate-800 hover:border-sky-400/20 rounded-xl p-4 focus:outline-none focus:border-sky-400/20 text-white pl-12 w-full'
        onFocus={() => setIsOpenDropdown(p => !p)}
      />
      <BiLocationPlus className='absolute left-4 text-white text-xl' />

      <ul
        className={`grid grid-cols-1 absolute w-full max-h-[20rem] overflow-y-scroll overflow-hidden top-[100%] left-0 rounded-2xl max-md:p-2 p-4 bg-gray-900 border-slate-300/10 border text-white ${
          isOpenDropdown ? 'grid' : 'hidden'
        }`}
        ref={listOfCitiesRef}
      >
        {cities.map(c => (
          <SearchItem key={c.id} name={c.name} />
        ))}
      </ul>
    </div>
  )
}
