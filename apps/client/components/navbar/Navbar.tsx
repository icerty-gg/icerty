'use client'

import { useState, useEffect, useRef } from 'react'
import { BiMenu } from 'react-icons/bi'

import { Backdrop } from '../ui/Backdrop'
import { PrimaryButton } from '../ui/PrimaryButton'

import { Logo } from './Logo'
import { MobileNavbar } from './MobileNavbar'
import { NavLink } from './NavLink'

export const Navbar = () => {
  const [isOpenedNav, setIsOpenedNav] = useState(false)
  const [isLower, setIsLower] = useState(false)
  const navbarRef: any = useRef()

  const toggleOpenNav = () => setIsOpenedNav(p => !p)

  useEffect(() => {
    const activeNav = () => {
      if (window.scrollY > 80) setIsLower(true)
      else setIsLower(false)
    }

    window.addEventListener('scroll', activeNav)

    return () => window.removeEventListener('scroll', activeNav)
  }, [])

  return (
    <>
      <nav
        ref={navbarRef}
        className='sticky text-center bg-gray-900/75 backdrop-blur w-full h-20 flex items-center  border-b border-slate-300/10 z-10 supports-backdrop-blur:bg-white/95'
      >
        <div className='max-w-screen-2xl w-full my-0 mx-auto px-8 flex items-center justify-between'>
          <Logo isSmall={false} />
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

      <nav
        className={`fixed w-full flex duration-300 text-center justify-center items-center z-50 transition-transform ${
          isLower ? 'translate-y-[-3.7rem]' : 'translate-y-[-10rem]'
        }`}
      >
        <div className='flex gap-2 items-center bg-gray-900/75 backdrop-blur p-2 rounded-full border-slate-300/10 border'>
          <Logo isSmall={true} className='mr-4' />
          <NavLink isMobile={true} title='Strona główna' href='/' />
          <NavLink isMobile={true} title='Ogłoszenia' href='/announcements' />
          <NavLink isMobile={true} title='Obserwowane' href='/observed' />
          <NavLink isMobile={true} title='Dodaj ogłoszenie' href='/add-announcement' />
        </div>
      </nav>
    </>
  )
}
