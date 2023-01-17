import { forwardRef } from 'react'

import { ErrorMessage } from '../error-message/ErrorMessage'

import type { ReactNode, InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  readonly children?: ReactNode
  readonly errorMessage?: string
}

export const CheckboxInput = forwardRef<HTMLInputElement, Props>(({ children, errorMessage, id, ...rest }, ref) => {
  return (
    <div className='flex flex-col gap-4 w-full'>
      <label className='text-white flex items-center gap-4 cursor-pointer text-sm' htmlFor={id}>
        <input
          type='checkbox'
          className='p-2 w-[1.3rem] h-[1.3rem] cursor-pointer text-sky-500 rounded-full border border-slate-800 checked:bg-sky-500 appearance-none'
          id={id}
          aria-invalid={errorMessage ? 'true' : 'false'}
          ref={ref}
          {...rest}
        />
        {children}
      </label>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  )
})
