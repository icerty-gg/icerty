'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { BiLockAlt, BiMailSend, BiUser, BiPhone, BiLocationPlus } from 'react-icons/bi'
import { z } from 'zod'

import { ErrorMessage } from '../../components/Form/ErrorMessage'
import { Input } from '../../components/Form/Input'
import { CheckboxInput } from '../../components/filter/CheckboxInput'
import { Container } from '../../components/ui/Container'
import { Heading } from '../../components/ui/Heading'
import { Layout } from '../../components/ui/Layout'
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

const Register = () => {
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
    <Layout>
      <div className='grid grid-cols-1 gap-4 w-full max-w-[46rem] m-auto'>
        <Container>
          <Heading title='Create Account' className='pb-6' />

          <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-6'>
            <Input
              register={{ ...register('firstName') }}
              className='max-md:col-span-2'
              icon={<BiUser className='text-lg' />}
              type='text'
              label='First name'
              error={errors.firstName?.message && <ErrorMessage>{errors.firstName?.message}</ErrorMessage>}
            />
            <Input
              register={{ ...register('lastName') }}
              className='max-md:col-span-2'
              icon={<BiUser className='text-lg' />}
              type='text'
              label='Last name'
              error={errors.lastName?.message && <ErrorMessage>{errors.lastName?.message}</ErrorMessage>}
            />
            <Input
              register={{ ...register('email') }}
              className='col-span-2'
              icon={<BiMailSend className='text-lg' />}
              type='email'
              label='Email'
              error={errors.email?.message && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
            />
            <Input
              register={{ ...register('password') }}
              className='col-span-2'
              icon={<BiLockAlt className='text-lg' />}
              type='password'
              label='Password'
              isPasswordType={true}
              error={errors.password?.message && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
            />
            <Input
              register={{ ...register('repeatPassword') }}
              className='col-span-2'
              icon={<BiLockAlt className='text-lg' />}
              type='password'
              label='Repeat password'
              isPasswordType={true}
              error={errors.repeatPassword?.message && <ErrorMessage>{errors.repeatPassword?.message}</ErrorMessage>}
            />
            <Input
              register={{ ...register('phoneNumber') }}
              className='max-md:col-span-2'
              icon={<BiPhone className='text-lg' />}
              type='tel'
              label='Phone number'
              error={errors.phoneNumber?.message && <ErrorMessage>{errors.phoneNumber?.message}</ErrorMessage>}
            />

            <Input
              register={{ ...register('city') }}
              className='max-md:col-span-2'
              icon={<BiLocationPlus className='text-lg' />}
              type='text'
              label='City'
              error={errors.city?.message && <ErrorMessage>{errors.city?.message}</ErrorMessage>}
            />

            <CheckboxInput
              validate={{ ...register('acceptPolicy') }}
              error={errors.acceptPolicy?.message && <ErrorMessage>{errors.acceptPolicy?.message}</ErrorMessage>}
            >
              I Accept the Terms of Service
            </CheckboxInput>

            <PrimaryButton isFormTypeButton={true} className='text-sm col-span-2' href='/'>
              Register
            </PrimaryButton>
          </form>
        </Container>
        <div className='flex flex-col gap-4 items-center p-4 rounded-xl border bg-gray-800/20 border-slate-800'>
          <p className='text-white'>You already have an account?</p>

          <SecondaryButton href='/login'>Login to your account!</SecondaryButton>
        </div>
      </div>
    </Layout>
  )
}

export default Register
