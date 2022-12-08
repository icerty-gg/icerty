'use client'
import { useState } from 'react'
import { BiMenu } from 'react-icons/bi'

import { Backdrop } from '../ui/Backdrop'
import { PrimaryButton } from '../ui/PrimaryButton'

import { Logo } from './Logo'
import { MobileNavbar } from './MobileNavbar'
import { NavLink } from './NavLink'

export const Navbar = () => {
  const [isOpenedNav, setIsOpenedNav] = useState(false)

  const toggleOpenNav = () => setIsOpenedNav(p => !p)

  return (
    <>
      <nav className='fixed text-center bg-gray-900 w-full h-20 flex items-center backdrop-blur-md border-b border-slate-300/10'>
        <div className='max-w-screen-2xl w-full my-0 mx-auto px-8 flex items-center justify-between'>
          <Logo />
          <div className='flex gap-2 max-lg:hidden'>
            <NavLink title='Strona główna' href='/' />
            <NavLink title='Ogłoszenia' href='/announcements' />
            <NavLink title='Obserwowane' href='/observed' />
            <NavLink title='Dodaj ogłoszenie' href='/add-announcement' />
          </div>

          <button
            className='hidden max-lg:flex p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors'
            onClick={toggleOpenNav}
          >
            <BiMenu className='text-white text-2xl' />
          </button>

          <div className='flex gap-3 items-center text-sm max-lg:hidden'>
            <PrimaryButton title='Zaloguj się' href='/sign-in' />
          </div>
        </div>
      </nav>

      <MobileNavbar isOpened={isOpenedNav} onOpenNav={toggleOpenNav} />
      {isOpenedNav && <Backdrop onHideNav={toggleOpenNav} />}
    </>
  )
}
