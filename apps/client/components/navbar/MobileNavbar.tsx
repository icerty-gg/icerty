import { BiX } from 'react-icons/bi'

import { PrimaryButton } from '../ui/PrimaryButton'

import { NavLink } from './NavLink'

interface Props {
  readonly isOpened: boolean
  readonly onOpenNav: () => void
}

export const MobileNavbar = ({ isOpened, onOpenNav }: Props) => {
  return (
    <div
      className={`${
        isOpened ? 'translate-x-[0]' : 'translate-x-[100%]'
      } fixed top-0 z-30 right-0 h-full w-96 bg-gray-900 transition-transform backdrop-blur-md border-l border-slate-300/10`}
    >
      <div className='p-6'>
        <button
          className='hidden max-lg:flex p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors'
          onClick={onOpenNav}
        >
          <BiX className='text-white text-2xl' />
        </button>

        <div className='flex flex-col gap-2 mt-12'>
          <NavLink isMobile={true} title='Strona główna' href='/' />
          <NavLink isMobile={true} title='Ogłoszenia' href='/offers' />
          <NavLink isMobile={true} title='Obserwowane' href='/observed' />
          <NavLink isMobile={true} title='Dodaj ogłoszenie' href='/add-offers' />
          <PrimaryButton href='/sign-in'>Zaloguj się</PrimaryButton>
        </div>
      </div>
    </div>
  )
}
