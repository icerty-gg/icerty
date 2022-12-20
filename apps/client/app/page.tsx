import { BiLockAlt } from 'react-icons/bi'

import { CategoryItem } from '../components/categories/CategoryItem'
import { Offer } from '../components/offers/Offer'
import { Container } from '../components/ui/Container'
import { Heading } from '../components/ui/Heading'
import { MainSearch } from '../components/ui/MainSearch'
import { PrimaryButton } from '../components/ui/PrimaryButton'
import { SecondaryButton } from '../components/ui/SecondaryButton'
import { UserStats } from '../components/userStats/UserStats'
import { api } from '../utils/fetcher'

const Home = async () => {
  const { data: categories } = await api.get('/categories/')
  const { data: offers } = await api.get('/offers/')

  const promotedOffers = offers.filter(f => f.isPromoted).slice(0, 10)

  return (
    <div className='relative'>
      <div className='grid grid-cols-2 gap-4'>
        <Container className='col-span-2 z-20'>
          <Heading title='Wyszukaj ogłoszenie' className='pb-6' />
          <MainSearch />
        </Container>

        <Container className='max-lg:col-span-2'>
          <Heading title='Kategorie główne' className='pb-6' />
          <ul className='sticky grid grid-cols-3 max-lg:grid-cols-2 gap-4 max-md:grid-cols-1 backdrop-blur max-h-[35rem] overflow-hidden overflow-y-scroll'>
            {categories.map(c => (
              <CategoryItem href={c.name} key={c.id} name={c.name} image={c.img} />
            ))}
          </ul>
        </Container>

        <Container className='max-lg:col-span-2'>
          <div className='flex items-center justify-center gap-4 pb-6'>
            <Heading title='Promowane Ogłoszenia' />
            <SecondaryButton href='/offers'>Pokaż wszystkie</SecondaryButton>
          </div>

          <ul className='sticky grid grid-cols-1 gap-4 backdrop-blur max-h-[35rem] overflow-hidden overflow-y-scroll min-w-[20rem]'>
            {promotedOffers.map(o => {
              return (
                <Offer key={o.id} id={o.id} image={o.images} name={o.name} price={o.price} createdAt={o.createdAt} />
              )
            })}
          </ul>
        </Container>

        <Container className='col-span-2'>
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
        </Container>
      </div>
    </div>
  )
}

export default Home
