import Image from 'next/image'
import { BiHeart } from 'react-icons/bi'

import { Container } from '../../../components/ui/Container'
import { Heading } from '../../../components/ui/Heading'
import { Layout } from '../../../components/ui/Layout'
import { PrimaryButton } from '../../../components/ui/PrimaryButton'
import { SecondaryButton } from '../../../components/ui/SecondaryButton'
import { api } from '../../../utils/fetcher'

export const generateStaticParams = async () => {
  const { data: offers } = await api.get('/offers/')

  return offers.map(o => ({
    id: o.id
  }))
}

interface Props {
  readonly params: { readonly id: string }
}

const OfferDetails = async ({ params }: Props) => {
  const { id } = params
  const offer = await api.get('/offers/:id', { params: { id: id } })

  return (
    <Layout>
      <div className='grid  grid-cols-[2fr,_1fr] gap-4'>
        <div className='grid grid-cols-1 gap-4 max-lg:col-span-2'>
          <Container>
            <Heading title='Image' className='pb-4' />
            <Image
              src='https://ajvfiitmeqcfguupmscm.supabase.co/storage/v1/object/public/offers/drewniane-biurko-7824.jpg'
              alt='chuj'
              width={800}
              height={500}
              className='rounded-xl object-cover'
            />
          </Container>

          <Container>
            <Heading title='Description' className='pb-4' />

            <p className='text-white'>{offer.description}</p>
          </Container>

          <div className='grid grid-cols-2 gap-4'>
            <Container>
              <Heading title='Seller' className='pb-4' />

              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-2'>
                  <Image
                    src={
                      'https://ajvfiitmeqcfguupmscm.supabase.co/storage/v1/object/public/offers/BIURKO_SIMONA_II-1.jpg'
                    }
                    width={50}
                    height={50}
                    alt={'user'}
                    className='rounded-[50%] w-[2.5rem] h-[2.5rem]'
                  />
                  <p className='text-white text-lg'>Stachu Jones</p>
                </div>
                <p className='text-white text-sm'>Joined at December 26, 2022</p>
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
                </div>
              </Container>
              <Container>
                <div className='flex flex-col gap-2'>
                  {offer.isPromoted && (
                    <h3 className='p-4 bg-sky-500/10 rounded-lg text-white text-center'>This offer is promoted</h3>
                  )}

                  <SecondaryButton
                    href='/followed'
                    className='w-full flex items-center justify-center gap-2 text-center'
                  >
                    <BiHeart className='text-lg' /> Follow item
                  </SecondaryButton>
                </div>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default OfferDetails
