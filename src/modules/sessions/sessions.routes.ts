import crypto from 'crypto'

import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import bcrypt from 'bcrypt'

import { prisma } from '../../utils/prisma'

import { isAuth } from './../../utils/IsAuth'
import { loginSchema, logoutSchema } from './sessions.schema'

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyPluginAsync } from 'fastify'

export const sessionRoutes: FastifyPluginAsync = async fastify => {
  fastify.withTypeProvider<TypeBoxTypeProvider>().post('/login', { schema: loginSchema }, async (request, reply) => {
    try {
      const { email, password } = request.body

      const user = await prisma.user.findFirst({
        where: {
          email: email.toLowerCase()
        }
      })

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return reply.code(404).send({ message: 'Incorrect username or password!' })
      }

      const token = await new Promise<string>((resolve, reject) => {
        crypto.randomBytes(48, (err, buffer) => {
          if (err) {
            reject(err)
          } else {
            resolve(buffer.toString('base64'))
          }
        })
      })

      const expiration_date = new Date()

      expiration_date.setTime(expiration_date.getTime() + 86400000)

      await prisma.auth_tokens.create({ data: { token, userId: user.id, expiration_date } })

      return reply
        .setCookie('token', token, { path: '/', expires: expiration_date, sameSite: 'lax' })
        .code(201)
        .send({ token })
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError || err instanceof Error) {
        return reply.code(500).send({ message: err.message })
      }
      return reply.code(500).send({ message: 'Something went wrong!' })
    }
  })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post('/logout', { schema: logoutSchema, preValidation: isAuth }, async (request, reply) => {
      try {
        const { token } = request.cookies

        await prisma.auth_tokens.delete({ where: { token } })

        return reply.code(200).send({ message: 'Logged out!' })
      } catch (err) {
        if (err instanceof PrismaClientKnownRequestError || err instanceof Error) {
          return reply.code(500).send({ message: err.message })
        }
        return reply.code(500).send({ message: 'Something went wrong!' })
      }
    })
}
