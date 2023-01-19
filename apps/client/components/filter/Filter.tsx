import Image from 'next/image'

import { api } from '../../utils/fetcher'
import { CheckboxInput } from '../Form/checkbox-input/CheckboxInput'
import { SearchCityInput } from '../searchCityInput/SearchCityInput'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { PrimaryButton } from '../ui/primary-button/PrimaryButton'
import { SecondaryButton } from '../ui/secondary-button/SecondaryButton'

const SmallHeading = ({ children }: { readonly children: string }) => (
  <h4 className='text-white text-lg pb-4'>{children}</h4>
)

export const Filter = async () => {
  const { categories } = await api.get('/categories/')

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
                return (
                  <li key={c.id}>
                    <input type='checkbox' id={c.name} value='' className='hidden peer' />
                    <label
                      htmlFor={c.name}
                      className='inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700'
                    >
                      <div className='block'>
                        <Image src={c.img} width={100} height={100} alt={c.name} />
                        <div className='w-full text-lg font-semibold'>{c.name}</div>
                      </div>
                    </label>
                  </li>
                )
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

          <PrimaryButton className='w-full fixed bottom-0 left-0'>Apply filters</PrimaryButton>
        </div>
      </Container>
    </div>
  )
}
