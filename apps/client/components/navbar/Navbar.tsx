'use client'

import { useRef } from 'react'
import { BiMenu } from 'react-icons/bi'

import { useCheckScroll } from '../../hooks/useCheckScroll'
import { useToggle } from '../../hooks/useToggle'
import { Backdrop } from '../ui/Backdrop'
import { PrimaryButton } from '../ui/PrimaryButton'

import { Logo } from './Logo'
import { MobileNavbar } from './MobileNavbar'
import { NavLink } from './NavLink'

export const Navbar = () => {
  const isOpenMiniNav = useCheckScroll(80)
  const [isOpenNav, toggleOpenNav] = useToggle()
  const navbarRef = useRef<HTMLElement | null>(null)

  return (
    <>
      <nav
        ref={navbarRef}
        className='sticky max-lg:fixed text-center bg-gray-900/75 backdrop-blur w-full h-20 flex items-center  border-b border-slate-300/10 z-30 supports-backdrop-blur:bg-white/95'
      >
        <div className='max-w-screen-2xl w-full px-8 my-0 flex flex-wrap items-center justify-between mx-auto'>
          <Logo isSmall={false} />
          <div className='flex gap-2 max-lg:hidden'>
            <NavLink title='Main Page' href='/' />
            <NavLink title='Offers' href='/offers' />
            <NavLink title='Observed' href='/observed' />
            <NavLink title='Add Offer' href='/add-offer' />
          </div>

          <button
            className='hidden max-lg:flex p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors'
            onClick={toggleOpenNav}
          >
            <BiMenu className='text-white text-2xl' />
          </button>

          <div className='flex gap-3 items-center text-sm max-lg:hidden'>
            <PrimaryButton href='/login'>Get Started</PrimaryButton>
          </div>
        </div>
      </nav>

      <MobileNavbar isOpened={isOpenNav} onOpenNav={toggleOpenNav} />

      {isOpenNav && <Backdrop onHideNav={toggleOpenNav} />}

      <nav
        className={`fixed w-full flex duration-300 text-center justify-center items-center z-50 transition-transform max-lg:hidden ${
          isOpenMiniNav ? 'translate-y-[-3.7rem]' : 'translate-y-[-10rem]'
        }`}
      >
        <div className='flex gap-2 items-center bg-gray-900/75 backdrop-blur p-2 rounded-full border-slate-300/10 border'>
          <Logo isSmall={true} className='mr-4' />
          <NavLink isMobile={true} title='Main Page' href='/' />
          <NavLink isMobile={true} title='Offers' href='/offers' />
          <NavLink isMobile={true} title='Observed' href='/observed' />
          <NavLink isMobile={true} title='Add Offer' href='/add-offer' />
          <PrimaryButton className='text-sm ml-4' href='/login'>
            Login
          </PrimaryButton>
        </div>
      </nav>
    </>
  )
}
