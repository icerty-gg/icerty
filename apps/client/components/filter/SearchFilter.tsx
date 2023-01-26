'use client'

import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { CiSearch } from 'react-icons/ci'

import { PrimaryButton } from '../../components/ui/primary-button/PrimaryButton'
import { useParams } from '../../hooks/useParams'

import type { ChangeEvent, FormEvent } from 'react'

export const SearchFilter = () => {
  const [searchInputValue, setSearchInputValue] = useState<string | null>(null)
  const { pathname, router, titleParams } = useParams()

  const changeSearchValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setSearchInputValue(title)

    if (!title) router.push(pathname ?? '')
  }

  const setParamsHandler = (e: FormEvent) => {
    e.preventDefault()

    router.push(`${pathname}?title=${searchInputValue ?? ''}`)
  }

  useEffect(() => {
    if (!titleParams) router.push(pathname ?? '')
  }, [pathname, router, titleParams])

  return (
    <form onSubmit={setParamsHandler} className='flex items-center gap-4'>
      <div className='flex relative items-center w-full max-w-[15rem] group'>
        <input
          id='searchInput'
          type='search'
          placeholder='Search offer...'
          className={clsx(
            'border bg-gray-800/20 border-slate-800 hover:border-sky-400/20 rounded-full p-4 focus:outline-none focus:border-sky-400/20 text-white pl-12 w-full'
          )}
          onChange={changeSearchValueHandler}
          defaultValue={titleParams ?? ''}
        />
        <label htmlFor='searchInput' className='absolute left-4'>
          <CiSearch className='text-white text-xl' />
        </label>
      </div>

      <PrimaryButton className={clsx(!searchInputValue && 'pointer-events-none opacity-50')}>Search</PrimaryButton>
    </form>
  )
}
