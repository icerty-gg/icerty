'use client'

import clsx from 'clsx'
import Link from 'next/link'

import { useRippleClickEffect } from '../../../hooks/useRippleClickEffect'

import type { ReactNode } from 'react'
interface Props {
  readonly children: ReactNode
  readonly className?: string
  readonly href: string
  readonly isFormTypeButton?: boolean
}

export const PrimaryButton = ({ children, className, href, isFormTypeButton }: Props) => {
  const { coords, createRippleHandler, isRipple } = useRippleClickEffect()

  if (isFormTypeButton) {
    return (
      <button
        className={clsx(
          'relative flex items-center justify-center gap-2 shadow-[0_0px_43px_-15px_rgba(0,0,0,0.3)] shadow-sky-500 text-white border-transparent bg-sky-500 hover:bg-sky-400 px-6 py-[0.6rem] rounded-full transition-all text-center font-bold text-sm overflow-hidden',
          className
        )}
        type='submit'
        onClick={createRippleHandler}
      >
        {children}
        {isRipple ? (
          <div
            style={{
              left: coords.x,
              top: coords.y
            }}
            className='absolute animate-[ripple_1.5s_ease_forwards] bg-white rounded-full translate-x-[-50%] translate-y-[-50%] pointer-events-none'
          />
        ) : null}
      </button>
    )
  }
  return (
    <Link
      className={clsx(
        'relative flex items-center justify-center gap-2 shadow-[0_0px_43px_-15px_rgba(0,0,0,0.3)] shadow-sky-500 text-white border-transparent bg-sky-500 hover:bg-sky-400 px-6 py-[0.6rem] rounded-full transition-all text-center font-bold text-sm overflow-hidden',
        className
      )}
      onClick={createRippleHandler}
      href={href}
    >
      {children}
      {isRipple && (
        <div
          style={{
            left: coords.x,
            top: coords.y
          }}
          className='absolute animate-[ripple_1.5s_ease_forwards] bg-white rounded-full translate-x-[-50%] translate-y-[-50%] pointer-events-none'
        />
      )}
    </Link>
  )
}
