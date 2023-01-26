import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

import { api } from '../../utils/fetcher'
import { CheckboxInput } from '../Form/checkbox-input/CheckboxInput'
import { SearchCityInput } from '../searchCityInput/SearchCityInput'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { PrimaryButton } from '../ui/primary-button/PrimaryButton'
import { SecondaryButton } from '../ui/secondary-button/SecondaryButton'

const SmallHeading = ({ children }: { readonly children: string }) => (
  <h4 className='text-white text-lg pb-4'>{children}</h4>
)

<<<<<<< HEAD
export const Filter = async () => {
  const { categories } = await api.get('/api/categories/')
=======
export const Filter = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get('/categories/')
  })
>>>>>>> fb30f42326af0a4bae9dcd154c07ce63d56404f9

  return (
    <div className='w-full h-full'>
      <Container className='sticky top-[6rem] max-lg:col-span-2'>
        <div className='flex items-center justify-center gap-4 pb-6'>
          <Heading title='Filters' />
          <SecondaryButton href='/offers'>Clear</SecondaryButton>
        </div>

        <div className='grid grid-cols-1 gap-4 max-h-[40rem] overflow-y-scroll overflow-hidden'>
          <Container className='flex items-center flex-col z-20'>
            <SmallHeading>City</SmallHeading>

            <SearchCityInput />
          </Container>

          <Container className='flex items-center flex-col'>
            <SmallHeading>Category</SmallHeading>
            {isLoading ? (
              <LoadingSpinner size='w-10 h-10' />
            ) : (
              <ul className='grid grid-cols-1 gap-4 max-h-[25rem] overflow-y-scroll overflow-hidden w-full'>
                {categories?.categories.map(c => {
                  return (
                    <li key={c.id}>
                      <input type='checkbox' id={c.name} value={c.name} className='hidden peer' />
                      <label
                        htmlFor={c.name}
                        className='flex items-center justify-between w-full p-2 text-white border bg-gray-800/20 border-slate-800 hover:bg-sky-800/10 rounded-xl peer-checked:border-sky-800 peer-checked:bg-sky-800/10 cursor-pointer'
                      >
                        <div className='flex items-center gap-4'>
                          <div className='flex items-center justify-center bg-sky-400/10 rounded-full'>
                            <Image src={c.img} width={70} height={70} alt={c.name} className='pointer-events-none' />
                          </div>
                          <div className='text-lg pointer-events-none'>{c.name}</div>
                        </div>
                      </label>
                    </li>
                  )
                })}
              </ul>
            )}
          </Container>

          <Container className='flex items-center flex-col'>
            <SmallHeading>Item condition</SmallHeading>
            <div className='flex flex-col gap-4'>
              <CheckboxInput>Used</CheckboxInput>
              <CheckboxInput>New</CheckboxInput>
            </div>
          </Container>

          <Container className='flex items-center flex-col'>
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

          <PrimaryButton className='w-full fixed bottom-0 left-0'>Apply filters</PrimaryButton>
        </div>
      </Container>
    </div>
  )
}
