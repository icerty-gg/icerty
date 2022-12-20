import { BiSearchAlt2 } from 'react-icons/bi'

import { SearchCityInput } from '../searchCityInput/SearchCityInput'

import { PrimaryButton } from './PrimaryButton'

export const MainSearch = () => {
  return (
    <form>
      <div className='grid grid-cols-2 gap-4 max-md:grid-cols-1'>
        <div className='flex relative items-center'>
          <input
            type='text'
            placeholder='21 767 537 ogłoszeń blisko Ciebie'
            className='border bg-gray-800/20 border-slate-800 hover:border-sky-400/20 rounded-xl p-4 focus:outline-none focus:border-sky-400/20 text-white pl-12 w-full'
          />
          <BiSearchAlt2 className='absolute left-4 text-white text-xl' />
        </div>
        <div className='flex items-center gap-4 max-md:flex-col'>
          <SearchCityInput />
          <PrimaryButton href='/offers'>Szukaj</PrimaryButton>
        </div>
      </div>
    </form>
  )
}
