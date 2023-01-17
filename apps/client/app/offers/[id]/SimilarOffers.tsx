'use client'

import { useState, useEffect } from 'react'

import { Offer } from '../../../components/offers/Offer'
import { PrimaryButton } from '../../../components/ui/primary-button/PrimaryButton'
import { SecondaryButton } from '../../../components/ui/secondary-button/SecondaryButton'

interface Offers {
  readonly city: string
  readonly createdAt: string
  readonly description: string
  readonly id: string
  readonly images: readonly { readonly id: string; readonly img: string }[]
  readonly isPromoted: boolean
  readonly name: string
  readonly price: number
  readonly updatedAt: string
}

interface Props {
  readonly offers: readonly Offers[]
  readonly pageOfferId: string
}

export const SimilarOffers = ({ offers, pageOfferId }: Props) => {
  const [visibleOffers, setvisibleOffers] = useState(2)
  const [fullOffers, setFullOffers] = useState(false)

  const similarOffers = offers.filter(o => o.id !== pageOfferId)

  useEffect(() => {
    if (similarOffers.length === visibleOffers || similarOffers.length < visibleOffers) setFullOffers(true)
  }, [similarOffers.length, visibleOffers])

  return (
    <ul className='grid grid-cols-1 gap-4'>
      {similarOffers.slice(0, visibleOffers).map(o => {
        return <Offer key={o.id} image={o.images[0]?.img} {...o} />
      })}
      <PrimaryButton
        onClick={() => {
          setvisibleOffers(p => p + 2)

          if (fullOffers) {
            setvisibleOffers(2)
            setFullOffers(false)
          }
        }}
      >
        {fullOffers ? 'Hide all' : 'Show more'}
      </PrimaryButton>
      {fullOffers && <SecondaryButton href='/offers'>All offers</SecondaryButton>}
    </ul>
  )
}
