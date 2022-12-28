import { api } from '../../utils/fetcher'
import { CategoryItem } from '../categories/CategoryItem'
import { CheckboxInput } from '../form/CheckboxInput'
import { SearchCityInput } from '../searchCityInput/SearchCityInput'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { PrimaryButton } from '../ui/PrimaryButton'
import { SecondaryButton } from '../ui/SecondaryButton'

import { PriceInput } from './PriceInput'
import { SmallHeading } from './SmallHeading'

export const Filter = async () => {
  const { data: categories } = await api.get('/categories/')

  return (
    <div className='w-full h-full'>
      <Container className='sticky top-[6rem] max-lg:col-span-2'>
        <div className='flex items-center justify-center gap-4 pb-6'>
          <Heading title='Filters' />
          <SecondaryButton href='/offers'>Clear</SecondaryButton>
        </div>

        <div className='grid grid-cols-1 gap-6 max-h-[40rem] overflow-y-scroll overflow-hidden'>
          <Container className='flex items-center flex-col z-20'>
            <SmallHeading>City</SmallHeading>

            <SearchCityInput />
          </Container>

          <Container className='flex items-center flex-col'>
            <SmallHeading>Category</SmallHeading>
            <ul className='grid grid-cols-1 gap-4 max-h-[25rem] overflow-y-scroll overflow-hidden w-full'>
              {categories.map(c => {
                return <CategoryItem key={c.id} href={c.name} name={c.name} image={c.img} isSmall={true} />
              })}
            </ul>
          </Container>

          <Container className='flex items-center flex-col'>
            <SmallHeading>Item condition</SmallHeading>
            <div className='flex flex-col gap-4'>
              <CheckboxInput>Used</CheckboxInput>
              <CheckboxInput>New</CheckboxInput>
            </div>
          </Container>

          <Container className='flex items-center flex-col mb-12'>
            <SmallHeading>Price</SmallHeading>

            <PriceInput />
          </Container>

          <PrimaryButton isFormTypeButton={true} href='/' className='w-full fixed bottom-0 left-0'>
            Apply filters
          </PrimaryButton>
        </div>
      </Container>
    </div>
  )
}
