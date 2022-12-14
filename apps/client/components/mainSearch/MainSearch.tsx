import { BiSearchAlt2, BiLocationPlus } from 'react-icons/bi'

import { PrimaryButton } from '../ui/PrimaryButton'

export const MainSearch = () => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='flex relative items-center'>
        <input
          type='text'
          placeholder='21 767 537 ogłoszeń blisko Ciebie'
          className='border bg-gray-800/20 border-slate-800 hover:border-sky-400/20 rounded-xl p-6 focus:outline-none focus:border-sky-400/20 text-white pl-12 w-full'
        />
        <BiSearchAlt2 className='absolute left-4 text-white text-xl' />
      </div>
      <div className='flex relative items-center gap-4'>
        <input
          type='text'
          placeholder='Cała Polska'
          className='border bg-gray-800/20 border-slate-800 hover:border-sky-400/20 rounded-xl p-6 focus:outline-none focus:border-sky-400/20 text-white pl-12 w-full'
        />
        <BiLocationPlus className='absolute left-4 text-white text-xl' />
        <PrimaryButton title='Szukaj' href='/announcements' />
      </div>
    </div>
  )
}
