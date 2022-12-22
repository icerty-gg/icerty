'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { BiLockAlt, BiMailSend, BiUser, BiPhone, BiLocationPlus } from 'react-icons/bi'
import { z } from 'zod'

import { Input } from '../../components/Form/Input'
import { CheckboxInput } from '../../components/filter/CheckboxInput'
import { SearchCityInput } from '../../components/searchCityInput/SearchCityInput'
import { Container } from '../../components/ui/Container'
import { Heading } from '../../components/ui/Heading'
import { PrimaryButton } from '../../components/ui/PrimaryButton'
import { SecondaryButton } from '../../components/ui/SecondaryButton'

import type { SubmitHandler } from 'react-hook-form'

const RegisterSchema = z.object({
  firstName: z.string().min(3, { message: 'First name is Required' }),
  lastName: z.string().min(3, { message: 'Last name is Required' }),
  email: z.string().email(),
  password: z.string().min(8, { message: 'Password is required' }),
  repeatPassword: z.string().min(8, { message: 'Password is required' }),
  phoneNumber: z.string().min(9, { message: 'Phone number is required' }),
  city: z.string().min(3, { message: 'City is required' }),
  acceptPolicy: z.literal(true, {
    invalid_type_error: 'You must accept Terms and Conditions'
  })
})

type FormSchemaType = z.infer<typeof RegisterSchema>

const RegisterForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<FormSchemaType>({
    resolver: zodResolver(RegisterSchema)
  })

  const onSubmit: SubmitHandler<FormSchemaType> = data => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-6'>
      <Input
        validate={{ ...register('firstName') }}
        className='max-md:col-span-2'
        icon={<BiUser className='text-lg' />}
        type='text'
        label='First Name'
        error={errors.firstName?.message && <p>{errors.firstName?.message}</p>}
      />
      <Input
        validate={{ ...register('lastName') }}
        className='max-md:col-span-2'
        icon={<BiUser className='text-lg' />}
        type='text'
        label='Last Name'
        error={errors.lastName?.message && <p>{errors.lastName?.message}</p>}
      />
      <Input
        validate={{ ...register('email') }}
        className='col-span-2'
        icon={<BiMailSend className='text-lg' />}
        type='email'
        label='Email'
        error={errors.email?.message && <p>{errors.email?.message}</p>}
      />
      <Input
        validate={{ ...register('password') }}
        className='col-span-2'
        icon={<BiLockAlt className='text-lg' />}
        type='password'
        label='Password'
        error={errors.password?.message && <p>{errors.password?.message}</p>}
      />
      <Input
        validate={{ ...register('repeatPassword') }}
        className='col-span-2'
        icon={<BiLockAlt className='text-lg' />}
        type='password'
        label='Repeat Password'
        error={errors.repeatPassword?.message && <p>{errors.repeatPassword?.message}</p>}
      />
      <Input
        validate={{ ...register('phoneNumber') }}
        className='max-md:col-span-2'
        icon={<BiPhone className='text-lg' />}
        type='text'
        label='Phone number'
        error={errors.phoneNumber?.message && <p>{errors.phoneNumber?.message}</p>}
      />
      <Input className='max-md:col-span-2' icon={<BiLocationPlus className='text-lg' />} type='text' label='City'>
        <SearchCityInput
          validate={{ ...register('city') }}
          error={errors.city?.message && <p>{errors.city?.message}</p>}
          className='text-sm'
        />
      </Input>

      <CheckboxInput
        error={errors.acceptPolicy?.message && <p>{errors.acceptPolicy?.message}</p>}
        validate={{ ...register('acceptPolicy') }}
      >
        Accept Privacy Policy, Terms
      </CheckboxInput>

      <PrimaryButton isFormTypeButton={true} className='text-sm col-span-2' href='/'>
        Login
      </PrimaryButton>
    </form>
  )
}

const Login = () => {
  return (
    <div className='relative'>
      <div className='grid grid-cols-1 gap-4 w-full max-w-[43rem] m-auto'>
        <Container>
          <Heading title='Create Account' className='pb-6' />

          <RegisterForm />
        </Container>
        <div className='flex flex-col gap-4 items-center p-4 rounded-xl border bg-gray-800/20 border-slate-800'>
          <p className='text-white'>You dont have an account?</p>

          <SecondaryButton href='/register'>Create new account!</SecondaryButton>
        </div>
      </div>
    </div>
  )
}

export default Login
