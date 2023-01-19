'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { CiHeart, CiDollar, CiHome, CiMedicalCross, CiUser, CiStar, CiLogout, CiLogin } from 'react-icons/ci'
import { useMutation, useQueryClient } from 'react-query'

import { useCheckScroll } from '../../hooks/useCheckScroll'
import { useUser } from '../../hooks/useUser'
import Logotype from '../../public/logo.svg'
import { api } from '../../utils/fetcher'
import { notify } from '../../utils/notifications'
import { PrimaryLink } from '../ui/primary-button/PrimaryLink'

import { NavLink } from './NavLink'

import type { ReactNode } from 'react'

interface Props {
  readonly className?: string
  readonly isHidden?: boolean
}

export const Logo = ({ className, isHidden }: Props) => (
  <Link className={clsx('text-xl text-white font-bold max-lg:hidden flex items-center gap-4', className)} href='/'>
    <Logotype className={clsx('transition-all w-12', isHidden && 'w-10')} />
    <h1 className={clsx('transition-opacity', isHidden && 'opacity-0')}>Icerty</h1>
  </Link>
)

interface PopupLinkProps {
  readonly href: string
  readonly icon: ReactNode
  readonly title: string
}

const PopupLinksData = [
  {
    title: 'Your account',
    href: '/user',
    icon: <CiUser className='text-2xl' />
  },
  {
    title: 'Your offers',
    href: '/user/offers',
    icon: <CiDollar className='text-2xl' />
  },
  {
    title: 'Your lists',
    href: '/user/lists',
    icon: <CiHeart className='text-2xl' />
  },
  {
    title: 'Your opinions',
    href: '/user/opinions',
    icon: <CiStar className='text-2xl' />
  }
]

const PopupLink = ({ href, icon, title }: PopupLinkProps) => {
  return (
    <li>
      <Link className='text-white flex items-center gap-4 p-2 rounded-full hover:bg-gray-800/40' href={href}>
        {icon} {title}
      </Link>
    </li>
  )
}

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
    href: '/lists',
    icon: <CiHeart className='text-2xl' />
  },
  {
    title: 'Add offer',
    href: '/add-offer',
    icon: <CiMedicalCross className='text-2xl' />
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
  const { user } = useUser()
  const isSmallerNavbar = useCheckScroll(80)
  const navbarRef = useRef<HTMLElement | null>(null)

  const { isLoading, mutate: logout } = useMutation({
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
          <Logo isHidden={isSmallerNavbar} />
          <div className='flex items-center'>
            {NavbarLinksData.map(l => {
              return <NavbarLink key={l.title} {...l} isSmallerNavbar={isSmallerNavbar} />
            })}
          </div>
          {user ? (
            <div className='relative hover:bg-gray-900 border border-transparent hover:border-slate-300/10 border-b-0 rounded-lg rounded-b-none group ml-4'>
              <NavLink href={`/user/${user.id}`}>
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
                <div className='flex flex-col items-start gap-[0.1rem]'>
                  <p className='text-gray-500'>Hello</p>
                  <p className='text-xl text-white first-letter:uppercase'>{user.name}</p>
                </div>

                <ul className='grid grid-cols-1'>
                  {PopupLinksData.map(l => {
                    return <PopupLink key={l.title} {...l} />
                  })}
                </ul>
                <button
                  onClick={() => logout()}
                  className={clsx(
                    'flex items-center justify-center gap-2 text-sky-600 border bg-sky-400/10 border-slate-800 hover:bg-sky-400/20  hover:border-sky-500 transition-all px-10 py-[0.5rem] rounded-full text-center text-sm'
                  )}
                >
                  <CiLogout className='text-xl' /> {isLoading ? 'Loading...' : 'Logout'}
                </button>
              </div>
            </div>
          ) : (
            <div className='flex gap-3 items-center text-sm'>
              <PrimaryLink href='/login'>
                <CiLogin className='text-xl' /> <p className='max-lg:hidden'>Login</p>
              </PrimaryLink>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
