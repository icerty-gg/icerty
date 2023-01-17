'use client'

import clsx from 'clsx'
import { forwardRef } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

import { useToggle } from '../../../hooks/useToggle'
import { ErrorMessage } from '../error-message/ErrorMessage'

import type { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  readonly className?: string
  readonly errorMessage?: string
  readonly icon: JSX.Element
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, errorMessage, icon, id, type, ...rest }, ref) => {
    const [isVisible, toggleIsVisible] = useToggle()

    return (
      <div className={clsx('flex flex-col gap-[0.7rem] w-full', className)}>
        <div className='relative flex items-center w-full group'>
          <label
            className='border border-r-0 bg-gray-800/20 border-slate-800 group-hover:border-sky-400/20 rounded-l-full  text-white text-sm flex items-center gap-2 p-4 h-[54px]'
            htmlFor={id}
          >
            {icon}
          </label>
          <div className='w-full flex items-center'>
            <input
              className='border border-l-0 bg-gray-800/20 border-slate-800 group-hover:border-sky-400/20  rounded-r-full p-4 pl-0 focus:outline-none group-focus:border-sky-400/20 text-white w-full text-sm'
              type={isVisible ? 'text' : type}
              aria-invalid={errorMessage ? 'true' : 'false'}
              id={id}
              ref={ref}
              {...rest}
            />

            {type === 'password' &&
              (isVisible ? (
                <AiOutlineEyeInvisible
                  onClick={toggleIsVisible}
                  className='absolute right-4 text-white text-xl cursor-pointer'
                />
              ) : (
                <AiOutlineEye
                  onClick={toggleIsVisible}
                  className='absolute right-4 text-white text-xl cursor-pointer'
                />
              ))}
          </div>
        </div>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
    )
  }
)
