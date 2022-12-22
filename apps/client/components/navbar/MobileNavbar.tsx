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
      } fixed top-0 z-[22929] right-0 h-full w-96 bg-gray-900 transition-transform backdrop-blur-md border-l border-slate-300/10`}
    >
      <div className='p-6'>
        <button
          className='hidden max-lg:flex p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors'
          onClick={onOpenNav}
        >
          <BiX className='text-white text-2xl' />
        </button>

        <div className='flex flex-col gap-2 mt-12'>
          <NavLink isMobile={true} title='Main Page' href='/' />
          <NavLink isMobile={true} title='Offers' href='/offers' />
          <NavLink isMobile={true} title='Observed' href='/observed' />
          <NavLink isMobile={true} title='Add Offer' href='/add-offer' />
          <PrimaryButton href='/login'>Login</PrimaryButton>
        </div>
      </div>
    </div>
  )
}
