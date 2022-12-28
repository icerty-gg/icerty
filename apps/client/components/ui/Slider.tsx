'use client'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Image from 'next/image'
import { Carousel } from 'react-responsive-carousel'

import { Container } from './Container'
import { Heading } from './Heading'

interface Images {
  readonly id: string
  readonly img: string
}

interface Props {
  readonly images: readonly Images[]
}

export const Slider = ({ images }: Props) => {
  return (
    <Container className='relative'>
      <Heading title='Images' className='mb-4' />
      <div className='flex items-center justify-center w-full h-full'>
        <div className='max-w-[50rem]'>
          <Carousel>
            {images.map(i => {
              return (
                <div key={i.id} className='w-full h-full flex items-center justify-center'>
                  <Image
                    src={i.img}
                    alt='Product image'
                    width={300}
                    height={300}
                    className='rounded-xl object-contain w-full h-full flex items-center justify-center'
                  />
                </div>
              )
            })}
          </Carousel>
        </div>
      </div>
    </Container>
  )
}
