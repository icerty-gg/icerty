interface Props {
  readonly children: React.ReactNode
}

export const CheckboxInput = ({ children }: Props) => {
  return (
    <label className='text-white flex items-center gap-4 cursor-pointer'>
      <input
        type='checkbox'
        className='p-2 w-[1.3rem] h-[1.3rem] cursor-pointer text-sky-500 rounded-full border border-slate-800 checked:bg-sky-500 appearance-none'
      />
      {children}
    </label>
  )
}
