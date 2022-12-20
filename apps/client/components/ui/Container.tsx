import clsx from 'clsx'

interface Props {
  readonly children: React.ReactNode
  readonly className?: string
}

export const Container = ({ children, className }: Props) => {
  return (
    <div
      className={`rounded-2xl max-md:p-2 p-4 bg-gray-900/75 backdrop-blur border-slate-300/10 border ${clsx(
        className && className
      )}`}
    >
      {children}
    </div>
  )
}
