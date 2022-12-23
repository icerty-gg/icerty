'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { BiLockAlt, BiMailSend } from 'react-icons/bi'
import { z } from 'zod'

import { ErrorMessage } from '../../components/Form/ErrorMessage'
import { Input } from '../../components/Form/Input'
import { Container } from '../../components/ui/Container'
import { Heading } from '../../components/ui/Heading'
import { Layout } from '../../components/ui/Layout'
import { PrimaryButton } from '../../components/ui/PrimaryButton'
import { SecondaryButton } from '../../components/ui/SecondaryButton'

import type { SubmitHandler } from 'react-hook-form'

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Password is required' })
})

type FormSchemaType = z.infer<typeof LoginSchema>

const LoginForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<FormSchemaType>({
    resolver: zodResolver(LoginSchema)
  })

  const onSubmit: SubmitHandler<FormSchemaType> = data => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-6'>
      <Input
        validate={{ ...register('email') }}
        className='col-span-2'
        icon={<BiMailSend className='text-lg' />}
        type='email'
        label='Email'
        error={errors.email?.message && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
      />
      <Input
        validate={{ ...register('password') }}
        className='col-span-2'
        icon={<BiLockAlt className='text-lg' />}
        type='password'
        label='Password'
        error={errors.password?.message && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
      />

      <PrimaryButton isFormTypeButton={true} className='text-sm col-span-2' href='/'>
        Login
      </PrimaryButton>
    </form>
  )
}

const Login = () => {
  return (
    <Layout>
      <div className='grid grid-cols-1 gap-4 w-full max-w-[35rem] m-auto'>
        <Container>
          <Heading title='Login to your account' className='pb-6' />

          <LoginForm />
        </Container>
        <div className='flex flex-col gap-4 items-center p-4 rounded-xl border bg-gray-800/20 border-slate-800'>
          <p className='text-white'>You dont have an account?</p>

          <SecondaryButton href='/register'>Create new account!</SecondaryButton>
        </div>
      </div>
    </Layout>
  )
}

export default Login
