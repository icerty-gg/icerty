'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { BiLockAlt, BiMailSend, BiUser } from 'react-icons/bi'
import { z } from 'zod'

import { CheckboxInput } from '../../components/form/CheckboxInput'
import { Input } from '../../components/form/input/Input'
import { Container } from '../../components/ui/Container'
import { Heading } from '../../components/ui/Heading'
import { Layout } from '../../components/ui/Layout'
import { SecondaryButton } from '../../components/ui/secondary-button/SecondaryButton'
import { PrimaryButton } from '../../components/ui/primary-button/PrimaryButton'
import { api } from '../../utils/fetcher'

import type { SubmitHandler } from 'react-hook-form'

// tu wartości też poprawiłem na te ze swaggera
const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Name must be at least 8 characters long' })
      .max(16, { message: 'Name must be at most 20 characters long' }),
    surname: z
      .string()
      .min(3, { message: 'Surname must be at least 8 characters long' })
      .max(20, { message: 'Surname must be at most 20 characters long' }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(20, { message: 'Password must be at most 20 characters long' }),
    repeatPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(20, { message: 'Password must be at most 20 characters long' }),
    acceptPolicy: z.literal(true, {
      invalid_type_error: 'You must accept Terms and Conditions'
    })
  })
  .superRefine(({ password, repeatPassword }, ctx) => {
    if (password !== repeatPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['password', 'repeatPassword'],
        message: 'Passwords do not match'
      })
    }
    // to działa, ale nie wiem jak dostać się do tego błędu, trzeba ogarnąć :D
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

  const onSubmit: SubmitHandler<FormSchemaType> = async ({ email, name, password, surname }) => {
    try {
      await api.post('/users/register', { email, surname, name, password })

      // zarejestrowano - zrób redirect lub co tam chcesz
    } catch (err) {
      // nie zarejestrowano - obsłuż błąd (email taken)
    }
  }

  return (
    <Layout>
      <div className='grid grid-cols-1 gap-4 w-full max-w-[46rem] m-auto'>
        <Container>
          <Heading title='Create Account' className='pb-6' />

          <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-6'>
            <Input
              className='max-md:col-span-2'
              icon={<BiUser className='text-lg' />}
              type='text'
              placeholder='First name'
              errorMessage={errors.name?.message}
              {...register('name')}
            />
            <Input
              className='max-md:col-span-2'
              icon={<BiUser className='text-lg' />}
              type='text'
              placeholder='Last name'
              errorMessage={errors.surname?.message}
              {...register('surname')}
            />
            <Input
              className='col-span-2'
              icon={<BiMailSend className='text-lg' />}
              type='email'
              placeholder='Email'
              errorMessage={errors.email?.message}
              {...register('email')}
            />
            <Input
              className='col-span-2'
              icon={<BiLockAlt className='text-lg' />}
              type='password'
              placeholder='Password'
              errorMessage={errors.password?.message}
              {...register('password')}
            />
            <Input
              className='col-span-2'
              icon={<BiLockAlt className='text-lg' />}
              type='password'
              placeholder='Repeat password'
              errorMessage={errors.repeatPassword?.message}
              {...register('repeatPassword')}
            />

            <CheckboxInput errorMessage={errors.acceptPolicy?.message} {...register('acceptPolicy')}>
              I Accept the Terms of Service
            </CheckboxInput>

            <PrimaryButton isFormTypeButton={true} className='text-sm col-span-2' href='/'>
              Register
            </PrimaryButton>
          </form>
        </Container>
        <div className='flex flex-col gap-4 items-center p-4 rounded-xl border bg-gray-800/20 border-slate-800'>
          <p className='text-white'>Already have an account?</p>

          <SecondaryButton href='/login'>Login to your account!</SecondaryButton>
        </div>
      </div>
    </Layout>
  )
}

export default Register
