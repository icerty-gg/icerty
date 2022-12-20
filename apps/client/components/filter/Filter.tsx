import { api } from '../../utils/fetcher'
import { CategoryItem } from '../categories/CategoryItem'
import { SearchCityInput } from '../searchCityInput/SearchCityInput'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { PrimaryButton } from '../ui/PrimaryButton'
import { SecondaryButton } from '../ui/SecondaryButton'

import { CheckboxInput } from './CheckboxInput'
import { PriceInput } from './PriceInput'
import { SmallHeading } from './SmallHeading'

export const Filter = async (): Promise<JSX.Element> => {
  const { data: categories } = await api.get('/categories/')

  return (
    <div className='w-full h-full relative'>
      <Container className='sticky top-[6rem] max-lg:col-span-2'>
        <div className='flex items-center justify-center gap-4 pb-6'>
          <Heading title='Filtry' />
          <SecondaryButton href='/announcements'>Wyczyść</SecondaryButton>
        </div>

        <div className='grid grid-cols-1 gap-6 max-h-[40rem] overflow-y-scroll overflow-hidden'>
          <Container className='flex items-center flex-col z-20'>
            <SmallHeading>Miasto</SmallHeading>

            <SearchCityInput />
          </Container>

          <Container className='flex items-center flex-col'>
            <SmallHeading>Kategoria</SmallHeading>
            <ul className='grid grid-cols-1 gap-4 max-h-[25rem] overflow-y-scroll overflow-hidden w-full'>
              {categories.map(c => {
                return <CategoryItem key={c.id} href={c.name} name={c.name} image={c.img} isSmall={true} />
              })}
            </ul>
          </Container>

          <Container className='flex items-center flex-col'>
            <SmallHeading>Stan przedmiotu</SmallHeading>
            <div className='flex flex-col gap-4'>
              <CheckboxInput>Używany</CheckboxInput>
              <CheckboxInput>Bardzo dobry</CheckboxInput>
              <CheckboxInput>Nowy</CheckboxInput>
            </div>
          </Container>

          <Container className='flex items-center flex-col'>
            <SmallHeading>Cena</SmallHeading>

            <PriceInput />
          </Container>

          <PrimaryButton href='/' className='w-full'>
            Pokaż wyniki
          </PrimaryButton>
        </div>
      </Container>
    </div>
  )
}
