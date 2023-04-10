import clsx from 'clsx'
import Link from 'next/link'

import type { ReactNode } from 'react'

interface Props {
  readonly children: ReactNode
  readonly className?: string
  readonly href: string
  readonly onClick?: () => void
}

export const PrimaryLink = ({ children, className, href, onClick }: Props) => {
  return (
    <Link
      className={clsx(
        'relative flex items-center justify-center gap-2 text-white bg-sky-500 px-6 py-[0.6rem] rounded-full transition-all text-center text-sm overflow-hidden group',
        className
      )}
      href={href}
      onClick={onClick}
    >
      {children}
      <span className='absolute translate-x-[-50%,_-50%] w-0 h-0 bg-white/20 rounded-[50%] group-hover:w-[60rem] group-hover:h-[60rem] transition-all duration-500' />
    </Link>
  )
}
