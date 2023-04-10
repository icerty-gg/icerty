import clsx from 'clsx'

import type { ReactNode } from 'react'

interface Props {
  readonly children: ReactNode
  readonly className?: string
  readonly onClick?: () => void
}

export const SecondaryButton = ({ children, className, onClick }: Props) => {
  return (
    <button
      className={clsx(
        'text-sky-600 border bg-sky-400/10 border-slate-800 hover:bg-sky-400/20  hover:border-sky-500 transition-all px-10 py-[0.6rem] rounded-full text-center text-sm',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
