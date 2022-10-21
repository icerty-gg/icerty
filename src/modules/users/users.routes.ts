import crypto from 'crypto'

import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import bcrypt from 'bcrypt'

import { prisma } from '../../utils/prisma'

import { createUserSchema, loginSchema } from './users.schema'

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyPluginAsync } from 'fastify'

export const userRoutes: FastifyPluginAsync = async fastify => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post('/register', { schema: createUserSchema }, async (request, reply) => {
      try {
        const { email, name, password, role, surname } = request.body

        const isUserRegistered = await prisma.user.findFirst({ where: { email } })

        if (isUserRegistered) {
          return reply.code(409).send({ message: 'This email is already taken!' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
          data: { name, role, surname, email: email.toLowerCase(), password: hashedPassword }
        })

        return reply.code(201).send(user)
      } catch (err) {
        if (err instanceof PrismaClientKnownRequestError || err instanceof Error) {
          return reply.code(500).send({ message: err.message })
        }
        return reply.code(500).send({ message: 'Something went wrong' })
      }
    })

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

      const expiry_date = new Date()

      expiry_date.setTime(expiry_date.getTime() + 86400000)

      await prisma.auth_tokens.create({ data: { token, userId: user.id, expiry_date } })

      return reply.setCookie('token', token, { path: '/' }).code(200).send(user)
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError || err instanceof Error) {
        return reply.code(500).send({ message: err.message })
      }
      return reply.code(500).send({ message: 'Something went wrong' })
    }
  })
}
