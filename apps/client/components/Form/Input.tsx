'use client'

import clsx from 'clsx'
import React from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

import { useToggle } from '../../hooks/useToggle'

import type { UseFormRegister, FieldValues } from 'react-hook-form'

interface Props {
  readonly children?: React.ReactNode
  readonly className?: string
  readonly error?: React.ReactNode
  readonly icon: JSX.Element
  readonly isPasswordType?: boolean
  readonly label: string
  readonly register: UseFormRegister<FieldValues> | any
  readonly type: string
}

export const Input = ({ children, className, error, icon, isPasswordType, label, register, type }: Props) => {
  const [isVisible, toggleIsVisible] = useToggle()

  return (
    <div className={clsx('flex flex-col gap-[0.7rem] w-full', className)}>
      {children ? (
        children
      ) : (
        <>
          <div className='relative flex items-center w-full group'>
            <label
              className='border border-r-0 bg-gray-800/20 border-slate-800 group-hover:border-sky-400/20 rounded-l-full  text-white text-sm flex items-center gap-2 p-4 h-[54px]'
              htmlFor={label}
            >
              {icon}
            </label>
            <div className='w-full flex items-center'>
              <input
                className='border border-l-0 bg-gray-800/20 border-slate-800 group-hover:border-sky-400/20  rounded-r-full p-4 pl-0 focus:outline-none group-focus:border-sky-400/20 text-white w-full text-sm'
                id={label}
                type={isPasswordType ? (isVisible ? 'text' : 'password') : type}
                placeholder={label}
                {...register}
              />

              {isPasswordType &&
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
          {error}
        </>
      )}
    </div>
  )
}
