'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { CiHeart, CiDollar, CiHome, CiMedicalCross, CiUser, CiLogout, CiLogin, CiStar } from 'react-icons/ci'

import { useCheckScroll } from '../../hooks/useCheckScroll'
import { useUser } from '../../hooks/useUser'
import Logotype from '../../public/logo.svg'
import { api } from '../../utils/fetcher'
import { notify } from '../../utils/notifications'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { PrimaryLink } from '../ui/primary-button/PrimaryLink'

import { NavLink } from './NavLink'

import type { ReactNode } from 'react'

interface NavbarLinkProps {
  readonly href: string
  readonly icon: ReactNode
  readonly isSmallerNavbar: boolean
  readonly title: string
}

const NavbarLinksData = [
  {
    title: 'Home',
    href: '/',
    icon: <CiHome className='text-2xl' />
  },
  {
    title: 'Offers',
    href: '/offers',
    icon: <CiDollar className='text-2xl' />
  },
  {
    title: 'Lists',
    href: '/user?tab=lists',
    icon: <CiHeart className='text-2xl' />
  },
  {
    title: 'Add offer',
    href: '/add-offer',
    icon: <CiMedicalCross className='text-2xl' />
  }
]

export const UserLinksData = [
  {
    title: 'Your account',
    href: '/user?tab=account',
    icon: <CiUser className='text-2xl' />
  },
  {
    title: 'Your offers',
    href: '/user?tab=offers',
    icon: <CiDollar className='text-2xl' />
  },
  {
    title: 'Your lists',
    href: '/user?tab=lists',
    icon: <CiHeart className='text-2xl' />
  },
  {
    title: 'Your opinions',
    href: '/user?tab=opinions',
    icon: <CiStar className='text-2xl' />
  }
]

const NavbarLink = ({ href, icon, isSmallerNavbar, title }: NavbarLinkProps) => {
  return (
    <NavLink href={href}>
      {icon}

      <p className={clsx('text-xs transition-all', isSmallerNavbar && 'translate-y-[-0.5rem] invisible opacity-0')}>
        {title}
      </p>
    </NavLink>
  )
}

export const Navbar = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { isLoading, user } = useUser()
  const isSmallerNavbar = useCheckScroll(80)
  const navbarRef = useRef<HTMLElement | null>(null)

  const { isLoading: logoutLoading, mutate: logout } = useMutation({
    mutationFn: () => api.post('/sessions/logout', undefined),
    onSuccess: () => {
      router.push('/')
      queryClient.setQueryData(['user'], null)
      notify('Successfully logout', 'success')
    },
    onError: () => {
      notify('Error', 'error')
    }
  })

  return (
    <>
      <nav
        ref={navbarRef}
        className={clsx(
          'fixed text-center bg-gray-900/90 backdrop-blur w-full h-20 flex items-center border-b border-slate-300/10 z-30 transition-all supports-backdrop-blur:bg-white/95 duration-300',
          isSmallerNavbar && 'h-16'
        )}
      >
        <div
          className={clsx(
            'w-full transition-all px-8 my-0 flex flex-wrap items-center justify-between max-lg:justify-center mx-auto max-w-screen-2xl'
          )}
        >
          <Link className={clsx('text-xl text-white font-bold max-lg:hidden flex items-center gap-4')} href='/'>
            <Logotype className={clsx('transition-all w-10')} />
            <h1 className={clsx('transition-opacity', isSmallerNavbar && 'opacity-0')}>Icerty</h1>
          </Link>
          <div className='flex items-center'>
            {NavbarLinksData.map(l => {
              return <NavbarLink key={l.title} {...l} isSmallerNavbar={isSmallerNavbar} />
            })}
          </div>

          {!isLoading ? (
            user ? (
              <div className='relative hover:bg-gray-900 border border-transparent hover:border-slate-300/10 border-b-0 rounded-lg rounded-b-none group ml-4'>
                <NavLink href='/user?tab=account'>
                  <CiUser className='text-2xl' />

                  <p
                    className={clsx(
                      'text-xs transition-all',
                      isSmallerNavbar && 'translate-y-[-0.5rem] invisible opacity-0'
                    )}
                  >
                    Account
                  </p>
                </NavLink>

                <div className='absolute p-4 right-0 top-[98%] w-[20rem] -z-10 bg-gray-900 border border-slate-300/10 rounded-lg rounded-tr-none invisible opacity-0 flex flex-col gap-4 group-hover:visible group-hover:opacity-100 transition-all'>
                  <div className='flex items-center gap-4'>
                    <Image src={user.img} alt={user.name} width={40} height={40} className='rounded-[50%]' />
                    <div className='flex flex-col items-start'>
                      <p className='text-gray-500'>Hello</p>
                      <p className='text-xl text-white first-letter:uppercase'>{user.name}</p>
                    </div>
                  </div>

                  <div className='flex items-center justify-center gap-2 text-white'>
                    <div className='w-full max-w-[2rem] h-[1px] bg-gray-700' />
                    <p>Account</p>
                    <div className='w-full max-w-[2rem] h-[1px] bg-gray-700' />
                  </div>

                  <ul className='grid grid-cols-1'>
                    {UserLinksData.map(l => {
                      return (
                        <li key={l.title}>
                          <Link
                            className='text-white text-sm flex items-center gap-4 p-2 rounded-full hover:bg-gray-800/40'
                            href={l.href}
                          >
                            {l.icon} {l.title}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                  <div className='flex items-center justify-center gap-2 text-white'>
                    <div className='w-full max-w-[2rem] h-[1px] bg-gray-700' />
                    <p>or</p>
                    <div className='w-full max-w-[2rem] h-[1px] bg-gray-700' />
                  </div>
                  <button
                    onClick={() => logout()}
                    className={clsx(
                      'flex items-center justify-center gap-2 text-sky-600 border bg-sky-400/10 border-slate-800 hover:bg-sky-400/20  hover:border-sky-500 transition-all px-10 py-[0.5rem] rounded-full text-center text-sm'
                    )}
                  >
                    {logoutLoading ? (
                      <LoadingSpinner size='w-[18px] h-[18px]' />
                    ) : (
                      <>
                        <CiLogout className='text-xl' /> <span>Logout</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className='flex gap-3 items-center text-sm'>
                <PrimaryLink href='/login'>
                  <CiLogin className='text-xl' /> <p className='max-lg:hidden'>Login</p>
                </PrimaryLink>
              </div>
            )
          ) : (
            <LoadingSpinner size='w-8 h-8' />
          )}
        </div>
      </nav>
    </>
  )
}
