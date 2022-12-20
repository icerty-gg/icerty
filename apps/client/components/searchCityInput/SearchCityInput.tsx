'use client'

import React, { useState } from 'react'
import { BiLocationPlus } from 'react-icons/bi'

import { SearchItem } from './SearchItem'
import { cities } from './cities'

export const SearchCityInput = () => {
  const [inputValue, setInputValue] = useState('')
  const [isOpenDropdown, setIsOpenDropdown] = useState(!!inputValue)

  const filteredCities = cities.filter(c => c.name.trim().toLowerCase().includes(inputValue.toLowerCase()))

  const searchValueHandler = (city: string) => {
    setInputValue(city)
    setIsOpenDropdown(false)
  }

  return (
    <div className='flex relative items-center w-full'>
      <input
        type='search'
        placeholder='Cała Polska'
        className='border bg-gray-800/20 border-slate-800 hover:border-sky-400/20 rounded-xl p-4 focus:outline-none focus:border-sky-400/20 text-white pl-12 w-full'
        onChange={e => setInputValue(e.target.value)}
        onFocus={() => setIsOpenDropdown(true)}
        onBlur={() => setTimeout(() => setIsOpenDropdown(false), 100)}
        value={inputValue}
      />
      <BiLocationPlus className='absolute left-4 text-white text-xl' />

      <div className={`absolute bg-gray-800 w-full top-[100%] left-0 ${isOpenDropdown ? 'grid' : 'hidden'}`}>
        <div className={`grid grid-cols-1 max-h-[20rem] overflow-y-scroll overflow-hidden text-white`}>
          {filteredCities.map(c => (
            <SearchItem onAddCity={searchValueHandler} key={c.id} name={c.name} />
          ))}
        </div>
        <button onClick={() => setIsOpenDropdown(false)}>Hide</button>
      </div>
    </div>
  )
}
