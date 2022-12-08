import { PrimaryButton } from '../ui/primaryButton'
import { SecondaryButton } from '../ui/secondaryButton'

import { Logo } from './logo'
import { NavLink } from './navLink'

export const Navbar = () => {
  return (
    <nav className='fixed bg-gray-900 w-full h-20 flex items-center backdrop-blur-md border-b border-slate-300/10'>
      <div className='max-w-screen-2xl w-full my-0 mx-auto px-8 flex items-center justify-between'>
        <Logo />
        <div className='flex gap-8'>
          <NavLink title='Strona główna' href='/' />
          <NavLink title='Ogłoszenia' href='/announcements' />
          <NavLink title='Obserwowane' href='/observed' />
        </div>

        <div className='flex gap-3 items-center text-sm'>
          <SecondaryButton title='Dodaj ogłoszenie' href='/add-announcement' />
          <PrimaryButton title='Zaloguj' href='/sign-in' />
        </div>
      </div>
    </nav>
  )
}
