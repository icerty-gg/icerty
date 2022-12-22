import clsx from 'clsx'

interface Props {
  readonly children?: React.ReactNode
  readonly className?: string
  readonly error?: React.ReactNode
  readonly icon: JSX.Element
  readonly label: string
  readonly type: string
  readonly validate?: any
}

export const Input = ({ children, className, error, icon, label, type, validate }: Props) => {
  return (
    <div className={clsx('flex flex-col gap-[0.7rem] w-full', className)}>
      <label className='text-white text-sm flex items-center gap-2' htmlFor={label}>
        {icon} {label}
      </label>
      {children ? (
        children
      ) : (
        <>
          <input
            className='border bg-gray-800/20 border-slate-800 hover:border-sky-400/20 rounded-xl p-4 focus:outline-none focus:border-sky-400/20 text-white w-full text-sm'
            id={label}
            type={type}
            placeholder={`Type ${label}`}
            {...validate}
          />
          {error}
        </>
      )}
    </div>
  )
}
