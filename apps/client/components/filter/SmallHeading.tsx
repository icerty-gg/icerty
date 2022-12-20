interface Props {
  readonly children: string
}

export const SmallHeading = ({ children }: Props) => <h4 className='text-white text-lg pb-4'>{children}</h4>
