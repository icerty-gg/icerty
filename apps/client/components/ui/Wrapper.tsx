interface Props {
  readonly children: React.ReactNode
}

export const Wrapper = ({ children }: Props) => (
  <div className='max-w-screen-2xl w-full my-0 mx-auto px-8 max-md:px-4'>{children}</div>
)
