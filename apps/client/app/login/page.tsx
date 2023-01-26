'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { BiLockAlt, BiMailSend } from 'react-icons/bi'
import { z } from 'zod'

import { Input } from '../../components/Form/input/Input'
import { Container } from '../../components/ui/Container'
import { Heading } from '../../components/ui/Heading'
import { Layout } from '../../components/ui/Layout'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { PrimaryButton } from '../../components/ui/primary-button/PrimaryButton'
import { SecondaryButton } from '../../components/ui/secondary-button/SecondaryButton'
import { api } from '../../utils/fetcher'
import { notify } from '../../utils/notifications'

import type { Api } from '../../utils/fetcher'
import type { ZodiosBodyByPath } from '@zodios/core'
import type { SubmitHandler } from 'react-hook-form'

const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(20, 'Password must be at most 20 characters long')
})

type FormSchemaType = z.infer<typeof LoginSchema>

const Login = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<FormSchemaType>({
    resolver: zodResolver(LoginSchema)
  })

  type User = ZodiosBodyByPath<Api, 'post', '/sessions/login'>

  const { isLoading, mutate: login } = useMutation({
    mutationFn: (loginData: User) => api.post('/sessions/login', loginData),
    onSuccess: loginData => {
      router.push('/')
      queryClient.setQueryData(['user'], loginData)
      notify('Successfully logged in', 'success')
    },
    onError: () => {
      notify('User not found', 'error')
    }
  })

  const onSubmit: SubmitHandler<FormSchemaType> = data => {
    login(data)
  }

  return (
    <Layout>
      <div className='grid grid-cols-1 gap-4 w-full max-w-[35rem] m-auto'>
        <Container>
          <Heading title='Login to your account' className='pb-6' />
          <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-6'>
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

            <PrimaryButton className='text-sm col-span-2'>
              {isLoading ? <LoadingSpinner size='w-[18px] h-[18px]' /> : 'Login'}
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
