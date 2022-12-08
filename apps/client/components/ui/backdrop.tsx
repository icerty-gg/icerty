interface Props {
  readonly onHideNav: () => void
}

export const Backdrop = ({ onHideNav }: Props) => (
  <div onClick={onHideNav} className='fixed top-0 z-20 left-0 w-full h-full bg-black/40' />
)
