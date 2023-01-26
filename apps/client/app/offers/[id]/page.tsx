import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { BiAddToQueue, BiBadgeCheck, BiLocationPlus, BiSmile, BiData, BiCategoryAlt, BiArrowBack } from 'react-icons/bi'

import { Container } from '../../../components/ui/Container'
import { FollowButton } from '../../../components/ui/FollowButton'
import { Heading } from '../../../components/ui/Heading'
import { Layout } from '../../../components/ui/Layout'
import { PrimaryButton } from '../../../components/ui/primary-button/PrimaryButton'
import { SecondaryButton } from '../../../components/ui/secondary-button/SecondaryButton'
import { Slider } from '../../../components/ui/slider/Slider'
import { api } from '../../../utils/fetcher'

import { SimilarOffers } from './SimilarOffers'

import type { ReactNode } from 'react'

export const generateStaticParams = async () => {
  const { offers } = await api.get('/api/offers/')

  return offers.map(o => ({
    id: o.id
  }))
}

const parseDate = (date: string) => {
  const dateObj = new Date(date)

  return dateObj.toLocaleDateString('us-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

interface OfferProps {
  readonly className?: string
  readonly icon: ReactNode
  readonly title: string
  readonly type: string
}

const OfferParams = ({ className, icon, title, type }: OfferProps) => {
  return (
    <p className={clsx('flex items-center gap-4 text-sm text-sky-600 bg-sky-400/10 rounded-lg py-2 px-4', className)}>
      {icon}
      <div className='flex flex-col gap-[0.1rem]'>
        <p className='text-white'>{title}</p>
        <p>{type}</p>
      </div>
    </p>
  )
}

const OfferDetails = async ({ params }: { readonly params: { readonly id: string } }) => {
  const offer = await api.get('/api/offers/:id', { params })

  // const { offers } = await api.get('/offers/')
  const createdDate = parseDate(offer.createdAt)

  const offerParamsData = [
    {
      title: 'City',
      type: offer.city,
      icon: <BiLocationPlus className='text-xl' />
    },
    {
      title: 'Condition',
      type: offer.condition,
      icon: <BiSmile className='text-xl' />
    },
    {
      title: 'Count',
      type: offer.count.toString(),
      icon: <BiData className='text-xl' />
    },
    {
      title: 'Category',
      type: offer.category.name,
      icon: <BiCategoryAlt className='text-xl' />
    },
    {
      title: 'Added at',
      type: createdDate,
      className: 'col-span-2',
      icon: <BiAddToQueue className='text-xl' />
    }
  ]

  return (
    <Layout>
      <div className='grid grid-cols-[2fr,_1fr] max-lg:grid-cols-1 gap-4'>
        <div className='grid grid-cols-1 gap-4 max-lg:col-span-2'>
          <div className='grid gap-4 relative'>
            <Slider images={offer.images} />
            <SecondaryButton className='absolute left-4 top-4 flex items-center justify-center' href='/offers'>
              <BiArrowBack className='text-xl' />
            </SecondaryButton>
          </div>
          <div className='grid grid-cols-1 gap-4 max-lg:grid-cols-1'>
            <Container>
              <Heading title='Description' className='pb-4' />

              <p className='text-white'>{offer.description}</p>
            </Container>
          </div>
          <Container>
            <Heading title='Similar offers' className='pb-4' />

            <SimilarOffers category={offer.category.name} />
          </Container>
        </div>
        <div className='relative w-full h-full'>
          <div className='sticky top-[6rem] max-lg:col-span-2'>
            <div className='grid grid-cols-1 gap-4'>
              <Container>
                <Heading title='About offer' className='pb-4' />
                <div className='flex flex-col gap-8'>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sky-500 flex items-center gap-2'>
                      <BiBadgeCheck className='text-xl' /> Item is Avaible
                    </p>
                    <h1 className='text-white text-3xl'>{offer.name}</h1>
                    <p className='text-white font-bold text-2xl'>{offer.price} USD</p>
                  </div>

                  <div className='flex flex-col gap-4'>
                    <div className='grid grid-cols-2 gap-4'>
                      {offerParamsData.map(o => {
                        return (
                          <OfferParams
                            key={o.title}
                            title={o.title}
                            type={o.type}
                            className={o.className}
                            icon={o.icon}
                          />
                        )
                      })}
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <PrimaryButton className='w-full'>Buy</PrimaryButton>
                    <FollowButton id={offer.id} />
                  </div>
                </div>
              </Container>

              <Container className='flex flex-col gap-2'>
                <Heading title='About seller' className='pb-4' />
                <div className='flex flex-col gap-2 p-2 rounded-lg text-sky-600 bg-sky-400/10'>
                  <Link href='/user' className='flex items-center gap-2 p-2'>
                    <Image
                      src={offer.user.img}
                      width={50}
                      height={50}
                      alt={`Profile picture of ${offer.user.name} ${offer.user.surname}`}
                      className='rounded-[50%] w-[2.5rem] h-[2.5rem]'
                    />
                    <p className='text-white text-lg'>
                      {offer.user.name} {offer.user.surname}
                    </p>
                  </Link>
                  <p className='text-sky-500 flex items-center gap-2'>
                    <BiBadgeCheck className='text-xl' /> Verified seller
                  </p>
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
