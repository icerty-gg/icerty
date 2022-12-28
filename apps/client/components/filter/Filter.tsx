import { api } from '../../utils/fetcher'
import { CategoryItem } from '../categories/CategoryItem'
import { CheckboxInput } from '../form/CheckboxInput'
import { SearchCityInput } from '../searchCityInput/SearchCityInput'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { PrimaryButton } from '../ui/PrimaryButton'
import { SecondaryButton } from '../ui/SecondaryButton'

const SmallHeading = ({ children }: { readonly children: string }) => (
  <h4 className='text-white text-lg pb-4'>{children}</h4>
)

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

            <div className='flex items-center gap-2'>
              <div className='flex items-center relative'>
                <input
                  type='text'
                  className='border bg-gray-800/20 border-slate-800 hover:border-sky-400/20 rounded-xl p-4 focus:outline-none focus:border-sky-400/20 text-white pl-16 w-full'
                />
                <span className='text-white absolute left-[1.2rem] pointer-events-none'>USD</span>
              </div>

              <p className='text-white'>-</p>
              <div className='flex items-center relative'>
                <input
                  type='text'
                  className='border bg-gray-800/20 border-slate-800 hover:border-sky-400/20 rounded-xl p-4 focus:outline-none focus:border-sky-400/20 text-white pl-16 w-full'
                />
                <span className='text-white absolute left-[1.2rem] pointer-events-none'>USD</span>
              </div>
            </div>
          </Container>

          <PrimaryButton isFormTypeButton={true} href='/' className='w-full fixed bottom-0 left-0'>
            Apply filters
          </PrimaryButton>
        </div>
      </Container>
    </div>
  )
}
