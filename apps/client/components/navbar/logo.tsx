import Link from 'next/link'

import Logotype from '../../img/logo.svg'

export const Logo = () => (
  <Link className='text-white text-2xl font-bold flex items-center gap-4' href='/'>
    <Logotype className='w-12' />
    Icerty
  </Link>
)
