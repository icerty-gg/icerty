import { clsx } from 'clsx'

interface Props {
  readonly className?: string
  readonly title: string
}

export const Heading = ({ className, title }: Props) => (
  <h2 className={clsx('text-2xl text-white font-bold text-center', className)}>{title}</h2>
)
