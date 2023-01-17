import { BiLockAlt, BiSearchAlt2 } from 'react-icons/bi'

import { CategoryItem } from '../components/categories/CategoryItem'
import { Offer } from '../components/offers/Offer'
import { SearchCityInput } from '../components/searchCityInput/SearchCityInput'
import { Container } from '../components/ui/Container'
import { Heading } from '../components/ui/Heading'
import { Layout } from '../components/ui/Layout'
import { PrimaryButton } from '../components/ui/primary-button/PrimaryButton'
import { PrimaryLink } from '../components/ui/primary-button/PrimaryLink'
import { SecondaryButton } from '../components/ui/secondary-button/SecondaryButton'
import { UserStats } from '../components/userStats/UserStats'
import { api } from '../utils/fetcher'

const Home = async () => {
  const { categories } = await api.get('/categories/')
  const { offers } = await api.get('/offers/')

  return (
    <Layout>
      <div className='grid grid-cols-2 gap-4'>
        <Container className='col-span-2 z-20 bg-transparent'>
          <Heading title='Find offers' className='pb-6' />
          <form>
            <div className='grid grid-cols-2 gap-4 max-md:grid-cols-1'>
              <div className='flex relative items-center'>
                <input
                  type='text'
                  id='searchOfferInput'
                  placeholder='Search offer'
                  className='border bg-gray-800/20 border-slate-800 hover:border-sky-400/20 rounded-full p-4 focus:outline-none focus:border-sky-400/20 text-white pl-12 w-full'
                />
                <label className='absolute left-4' htmlFor='searchOfferInput'>
                  <BiSearchAlt2 className='text-white text-xl' />
                </label>
              </div>
              <div className='flex items-center gap-4 max-md:flex-col'>
                <SearchCityInput />
                <PrimaryButton>
                  <BiSearchAlt2 className='text-2xl' /> Find
                </PrimaryButton>
              </div>
            </div>
          </form>
        </Container>

        <div className='grid grid-cols-[1fr,_2fr] col-span-2 gap-4 max-lg:grid-cols-1'>
          <Container>
            <Heading title='Categories' className='pb-6' />
            <ul className='sticky grid grid-cols-2 max-lg:grid-cols-2 gap-4 max-md:grid-cols-1 backdrop-blur max-h-[35rem] overflow-hidden overflow-y-scroll'>
              {categories.map(c => (
                <CategoryItem key={c.id} {...c} />
              ))}
            </ul>
          </Container>

          <Container>
            <div className='flex items-center justify-center gap-4 pb-6'>
              <Heading title='Promoted offers' />
              <SecondaryButton href='/offers'>Check all</SecondaryButton>
            </div>

            <ul className='sticky grid grid-cols-1 gap-4 backdrop-blur max-h-[35rem] overflow-hidden overflow-y-scroll min-w-[20rem]'>
              {offers.map(o => (
                <Offer image={o.images[0]?.img} key={o.id} {...o} />
              ))}
            </ul>
          </Container>
        </div>

        <Container className='col-span-2'>
          <Heading title='Your offers' className='pb-6' />
          <div className='relative'>
            <UserStats />

            <div className='absolute top-0 left-0 w-full h-full flex items-center flex-col gap-6 justify-center'>
              <p className='flex items-center text-center font-bold text-white text-xl gap-4'>
                <BiLockAlt className='text-2xl' /> You need to login!
              </p>
              <PrimaryLink href='/login'>Login</PrimaryLink>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  )
}

export default Home
