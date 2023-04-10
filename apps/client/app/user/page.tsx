'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { UserLinksData } from '../../components/navbar/Navbar'
import { Container } from '../../components/ui/Container'
import { useUser } from '../../hooks/useUser'

import { Lists } from './tabs/Lists'

const User = () => {
  const { user } = useUser()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabSearchParams = searchParams.get('tab')

  useEffect(() => {
    if (!tabSearchParams) router.push('/user?tab=account')
    
    if (!user) router.push('/')
  }, [tabSearchParams, router, user])

  return (
    <div className='grid grid-cols-[1fr,_2fr] gap-4'>
      <div className='w-full h-full relative'>
        <Container className='sticky top-[6rem] left-0 flex flex-col'>
          <ul className='flex flex-col'>
            {UserLinksData.map(l => {
              return (
                <li key={l.title}>
                  <Link
                    className={clsx(
                      'text-white text-sm flex items-center gap-4 p-2 rounded-full hover:bg-gray-800/40',
                      `${pathname}?tab=${tabSearchParams}` === l.href && 'bg-gray-800/40'
                    )}
                    href={l.href}
                  >
                    {l.icon} {l.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </Container>
      </div>

      <Container>
        {tabSearchParams === 'account' && <p>Account</p>}
        {tabSearchParams === 'lists' && <Lists />}
        {tabSearchParams === 'offers' && <p>Offers</p>}
        {tabSearchParams === 'opinions' && <p>Opinions</p>}
      </Container>
    </div>
  )
}

export default User
