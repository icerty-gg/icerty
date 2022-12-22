'use client'

import clsx from 'clsx'
import React, { useState } from 'react'
import { BiLocationPlus } from 'react-icons/bi'

import { SearchItem } from './SearchItem'
import { cities } from './cities'

interface Props {
  readonly className?: string
  readonly error?: React.ReactNode
  readonly validate?: any
}

export const SearchCityInput = ({ className, error, validate }: Props) => {
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
        placeholder='Everywhere'
        className={clsx(
          'border bg-gray-800/20 border-slate-800 hover:border-sky-400/20 rounded-xl p-4 focus:outline-none focus:border-sky-400/20 text-white pl-12 w-full',
          className
        )}
        onChange={e => setInputValue(e.target.value)}
        onFocus={() => setIsOpenDropdown(true)}
        onBlur={() => setTimeout(() => setIsOpenDropdown(false), 100)}
        value={inputValue}
        {...validate}
      />
      <BiLocationPlus className='absolute left-4 text-white text-xl' />

      <div
        className={`absolute bg-gray-800 overflow-hidden w-full top-[100%] left-0 rounded-xl ${
          isOpenDropdown ? 'grid' : 'hidden'
        }`}
      >
        <ul className={`grid grid-cols-1 max-h-[15rem] overflow-y-auto overflow-hidden text-white`}>
          {filteredCities.map(c => (
            <SearchItem onAddCity={searchValueHandler} key={c.id} name={c.name} />
          ))}
        </ul>
      </div>
      {error}
    </div>
  )
}
