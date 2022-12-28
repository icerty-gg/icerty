interface Props {
  readonly children?: React.ReactNode
  readonly error?: React.ReactNode
  readonly validate?: any
}

export const CheckboxInput = ({ children, error, validate }: Props) => {
  return (
    <div className='flex flex-col gap-4 w-full'>
      <label className='text-white flex items-center gap-4 cursor-pointer text-sm'>
        <input
          type='checkbox'
          className='p-2 w-[1.3rem] h-[1.3rem] cursor-pointer text-sky-500 rounded-full border border-slate-800 checked:bg-sky-500 appearance-none'
          {...validate}
        />
        {children}
      </label>
      {error}
    </div>
  )
}
