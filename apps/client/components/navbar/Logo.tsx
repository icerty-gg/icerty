import Link from 'next/link'

import Logotype from '../../public/logo.svg'

interface Props {
  readonly className?: string
  readonly isSmall?: boolean
}

export const Logo = ({ className, isSmall }: Props) => (
  <Link
    className={`text-white ${isSmall ? 'text-xl' : 'text-2xl'} font-bold flex items-center gap-4 ${className}`}
    href='/'
  >
    <Logotype className={`${isSmall ? 'w-[2.7rem]' : 'w-12'}`} />
    <h1>Icerty</h1>
  </Link>
)
