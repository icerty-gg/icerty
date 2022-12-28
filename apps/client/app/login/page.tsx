'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { BiLockAlt, BiMailSend } from 'react-icons/bi'
import { z } from 'zod'

import { ErrorMessage } from '../../components/form/ErrorMessage'
import { Input } from '../../components/form/Input'
import { Container } from '../../components/ui/Container'
import { Heading } from '../../components/ui/Heading'
import { Layout } from '../../components/ui/Layout'
import { PrimaryButton } from '../../components/ui/PrimaryButton'
import { SecondaryButton } from '../../components/ui/SecondaryButton'
import { api } from '../../utils/fetcher'

import type { SubmitHandler } from 'react-hook-form'

const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(20, 'Password must be at most 20 characters long')
  // te wartości możesz sprawdić w docsach na swaggerze - tam widać ile min / max musi mieć hasło i inne rzeczy
})

type FormSchemaType = z.infer<typeof LoginSchema>

const Login = () => {
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<FormSchemaType>({
    resolver: zodResolver(LoginSchema)
  })

  const onSubmit: SubmitHandler<FormSchemaType> = async data => {
    try {
      const user = await api.post('/sessions/login', data)

      console.log(user)
      // zalogowano - tu chcesz zapisać usera w contextcie i gdzieś przekierować
    } catch (err) {
      // nie ma takiego użytkownika - wyświetl jakiś error
    }
  }

  return (
    <Layout>
      <div className='grid grid-cols-1 gap-4 w-full max-w-[35rem] m-auto'>
        <Container>
          <Heading title='Login to your account' className='pb-6' />
          <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-6'>
            <Input
              register={{ ...register('email') }}
              className='col-span-2'
              icon={<BiMailSend className='text-lg' />}
              type='email'
              label='Email'
              error={errors.email?.message && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            />
            <Input
              register={{ ...register('password') }}
              className='col-span-2'
              icon={<BiLockAlt className='text-lg' />}
              type='password'
              label='Password'
              isPasswordType={true}
              error={errors.password?.message && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            />

            <PrimaryButton isFormTypeButton={true} className='text-sm col-span-2' href='/'>
              Login
            </PrimaryButton>
          </form>
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
