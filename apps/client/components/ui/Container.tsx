import clsx from 'clsx'

interface Props {
  readonly children: React.ReactNode
  readonly className?: string
}

export const Container = ({ children, className }: Props) => {
  return (
    <div
      className={clsx('rounded-2xl p-4 pt-6 bg-gray-900/75 backdrop-blur border-slate-300/10 border', className)}
    >
      {children}
    </div>
  )
}
