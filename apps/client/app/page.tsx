import { BiLockAlt } from 'react-icons/bi'

import { Announcement } from '../components/announcements/Announcement'
import { CategoryItem } from '../components/categories/CategoryItem'
import { BluredCircle } from '../components/ui/BluredCircle'
import { Heading } from '../components/ui/Heading'
import { MainSearch } from '../components/ui/MainSearch'
import { PrimaryButton } from '../components/ui/PrimaryButton'
import { SecondaryButton } from '../components/ui/SecondaryButton'
import { Wrapper } from '../components/ui/Wrapper'
import { UserStats } from '../components/userStats/UserStats'
import { fetcher } from '../utils/fetcher'

const getCategories = async () => {
  const getCategories = fetcher.path('/api/categories/').method('get').create()

  const { data } = await getCategories({})

  return data.categories
}

const Home = async () => {
  const categories = await getCategories()

  return (
    <Wrapper>
      <div className='relative'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='rounded-2xl p-8 bg-gray-900/75 backdrop-blur border-slate-300/10 border col-span-2'>
            <Heading title='Wyszukaj ogłoszenie' className='pb-6' />
            <MainSearch />
          </div>

          <div className='rounded-2xl max-lg:col-span-2 px-4 pt-6 bg-gray-900/75 backdrop-blur border-slate-300/10 border'>
            <Heading title='Kategorie główne' className='pb-6' />
            <ul className='sticky grid grid-cols-3 max-lg:grid-cols-2 gap-4 max-md:grid-cols-1  backdrop-blur max-h-[35rem] overflow-hidden overflow-y-scroll'>
              {categories.map(c => (
                <CategoryItem href={`categories/${c.name.toLowerCase()}`} key={c.id} name={c.name} image={c.img} />
              ))}
            </ul>
          </div>

          <div className='rounded-2xl max-lg:col-span-2 px-4 pt-6 bg-gray-900/75 backdrop-blur border-slate-300/10 border'>
            <div className='flex items-center justify-center gap-4 pb-6'>
              <Heading title='Promowane Ogłoszenia' />
              <SecondaryButton href='/announcements'>Pokaż wszystkie</SecondaryButton>
            </div>
            <ul className='sticky grid grid-cols-1 gap-4 backdrop-blur max-h-[35rem] overflow-hidden overflow-y-scroll min-w-[20rem]'>
              <Announcement />
              <Announcement />
              <Announcement />
              <Announcement />
              <Announcement />
              <Announcement />
              <Announcement />
            </ul>
          </div>

          <div className='rounded-2xl p-8 bg-gray-900/75 border-slate-300/10 border col-span-2'>
            <Heading title='Twoje ogłoszenia' className='pb-6' />
            <div className='relative'>
              <UserStats />

              <div className='absolute top-0 left-0 w-full h-full flex items-center flex-col gap-6 justify-center'>
                <p className='flex items-center text-center font-bold text-white text-xl gap-4'>
                  <BiLockAlt className='text-2xl' /> Musisz być zalogowany!
                </p>
                <PrimaryButton href='/sign-in'>Zaloguj</PrimaryButton>
              </div>
            </div>
          </div>
        </div>
        <BluredCircle />
      </div>
    </Wrapper>
  )
}

export default Home
