'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { BiLockAlt, BiMailSend, BiUser } from 'react-icons/bi'
import { z } from 'zod'

import { ErrorMessage } from '../../components/Form/ErrorMessage'
import { Input } from '../../components/Form/Input'
import { CheckboxInput } from '../../components/filter/CheckboxInput'
import { Container } from '../../components/ui/Container'
import { Heading } from '../../components/ui/Heading'
import { Layout } from '../../components/ui/Layout'
import { PrimaryButton } from '../../components/ui/PrimaryButton'
import { SecondaryButton } from '../../components/ui/SecondaryButton'
import { api } from '../../utils/fetcher'

import type { SubmitHandler } from 'react-hook-form'


// min i max wartości do poprawy zgodznie ze swaggerem
const RegisterSchema = z
  .object({
    name: z.string().min(3, { message: 'First name is Required' }),
    surname: z.string().min(3, { message: 'Last name is Required' }),
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password is required' }),
    repeatPassword: z.string().min(8, { message: 'Password is required' }),
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
      // nie zarejestrowano - obsłuż błąd
    }
  }

  return (
    <Layout>
      <div className='grid grid-cols-1 gap-4 w-full max-w-[46rem] m-auto'>
        <Container>
          <Heading title='Create Account' className='pb-6' />

          <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-6'>
            <Input
              register={{ ...register('name') }}
              className='max-md:col-span-2'
              icon={<BiUser className='text-lg' />}
              type='text'
              label='First name'
              error={errors.name?.message && <ErrorMessage>{errors.name?.message}</ErrorMessage>}
            />
            <Input
              register={{ ...register('surname') }}
              className='max-md:col-span-2'
              icon={<BiUser className='text-lg' />}
              type='text'
              label='Last name'
              error={errors.surname?.message && <ErrorMessage>{errors.surname?.message}</ErrorMessage>}
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
