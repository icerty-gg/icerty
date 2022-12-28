import Image from 'next/image'
import { BiHeart } from 'react-icons/bi'

import { Container } from '../../../components/ui/Container'
import { Heading } from '../../../components/ui/Heading'
import { Layout } from '../../../components/ui/Layout'
import { PrimaryButton } from '../../../components/ui/PrimaryButton'
import { SecondaryButton } from '../../../components/ui/SecondaryButton'
import { Slider } from '../../../components/ui/Slider'
import { api } from '../../../utils/fetcher'

export const generateStaticParams = async () => {
  const { data: offers } = await api.get('/offers/')

  return offers.map(o => ({
    id: o.id
  }))
}

// hook useDate nie ma sensu - hooki robisz jak używasz stanów reaktowych, tak to tworzysz helper funkcję, w tym przypadku jak używasz to parsowanie daty tylko tu
// to nie ma sensu jej wydzielać w ogóle, jak zaczniesz używać jej w innych miejscach to wtedy przenieś do utils
const parseDate = (date: string) => {
  const dateObj = new Date(date)

  return dateObj.toLocaleDateString('us-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

interface Props {
  readonly params: { readonly id: string }
}

const OfferDetails = async ({ params }: Props) => {
  const { offer, user } = await api.get('/offers/:id', { params })

  return (
    <Layout>
      <div className='grid grid-cols-[2fr,_1fr] max-lg:grid-cols-1 gap-4'>
        <div className='grid grid-cols-1 gap-4 max-lg:col-span-2'>
          <Slider images={offer.images} />

          <div className='grid grid-cols-2 gap-4 max-lg:grid-cols-1'>
            <Container>
              <Heading title='Seller' className='pb-4' />

              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-2'>
                  <Image
                    src={user.img}
                    width={50}
                    height={50}
                    alt={`Profile picture of ${user.name} ${user.surname}`}
                    className='rounded-[50%] w-[2.5rem] h-[2.5rem]'
                  />
                  <p className='text-white text-lg'>
                    {user.name} {user.surname}
                  </p>
                </div>
                <p className='text-white text-sm'>Joined at {parseDate(offer.createdAt)}</p>
                <SecondaryButton href={`/users/${offer.userId}`} className='w-full'>
                  Check Profile
                </SecondaryButton>
              </div>
            </Container>
            <Container>
              <Heading title='Description' className='pb-4' />

              <p>{offer.description}</p>
            </Container>
          </div>

          <Container>
            <Heading title='Other offers' className='pb-4' />
          </Container>
        </div>

        <div className='relative w-full h-full'>
          <div className='sticky top-[6rem] max-lg:col-span-2'>
            <div className='grid grid-cols-1 gap-4'>
              <Container>
                <Heading title='Informations' className='pb-4' />
                <div className='flex flex-col gap-2'>
                  <h1 className='text-sky-500 text-2xl font-bold'>{offer.name}</h1>
                  <h3 className='text-white font-bold text-xl mb-2'>{offer.price} USD</h3>

                  <PrimaryButton href='/' className='w-full'>
                    Buy
                  </PrimaryButton>
                  <SecondaryButton
                    href='/followed'
                    className='w-full flex items-center justify-center gap-2 text-center'
                  >
                    <BiHeart className='text-lg' /> Follow item
                  </SecondaryButton>
                </div>
              </Container>
              <Container>
                <Heading title='Description' className='pb-4' />

                <p className='text-white'>{offer.description}</p>
              </Container>

              <div className='flex flex-col gap-2'>
                {offer.isPromoted && (
                  <h3 className='p-4 bg-sky-500/10 rounded-lg text-white text-center'>This offer is promoted</h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default OfferDetails
