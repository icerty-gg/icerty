import { getCategoriesSchema, validateSchema } from 'common'

import { Announcement } from '../components/announcements/Announcement'
import { CategoryItem } from '../components/categories/CategoryItem'
import { MainSearch } from '../components/mainSearch/MainSearch'
import { BluredCircle } from '../components/ui/BluredCircle'
import { Heading } from '../components/ui/Heading'
import { SecondaryButton } from '../components/ui/SecondaryButton'
import { Wrapper } from '../components/ui/Wrapper'
import { api } from '../constants/api'

const getCategories = async () => {
  const schema = getCategoriesSchema['response'][200]

  const { data } = await api.get('/categories')

  const { categories } = validateSchema(schema, data)

  return categories
}

const Home = async () => {
  const categories = await getCategories()

  return (
    <Wrapper>
      <div className='relative'>
        <div className='grid grid-cols-2 gap-4 max-lg:grid-cols-1'>
          <div className='rounded-2xl p-8 bg-gray-900/75 backdrop-blur border-slate-300/10 border col-span-2'>
            <Heading title='Wyszukaj ogłoszenie' className='pb-6' />
            <MainSearch />
          </div>

          <div className='rounded-2xl px-4 pt-6 bg-gray-900/75 backdrop-blur border-slate-300/10 border'>
            <Heading title='Kategorie główne' className='pb-6' />
            <ul className='sticky grid grid-cols-3 gap-4 max-md:grid-cols-1  backdrop-blur max-h-[35rem] overflow-hidden overflow-y-scroll'>
              {categories.map(c => (
                <CategoryItem href={`categories/${c.name.toLowerCase()}`} key={c.id} name={c.name} image={c.img} />
              ))}
            </ul>
          </div>

          <div className='rounded-2xl px-4 pt-6 bg-gray-900/75 backdrop-blur border-slate-300/10 border'>
            <div className='flex items-center justify-center gap-4 pb-6'>
              <Heading title='Rekomendowane Ogłoszenia' />
              <SecondaryButton title='Pokaż wszystkie' href='/announcements' />
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
        </div>
        <BluredCircle />
      </div>
    </Wrapper>
  )
}

export default Home
