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
        const hashedPassword = await bcrypt.hash(request.body.password, 10)

        const user = await prisma.user.create({
          data: { ...request.body, email: request.body.email.toLowerCase(), password: hashedPassword }
        })

        return reply.code(201).send(user)
      } catch (err) {
        if (err instanceof PrismaClientKnownRequestError || err instanceof Error) {
          return reply.code(500).send({ message: err.message })
        }
        return reply.code(500).send({ message: 'Something went wrong' })
      }
    })

  fastify.withTypeProvider<TypeBoxTypeProvider>().post('/sessions', { schema: loginSchema }, async (request, reply) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: request.body.email.toLowerCase()
        }
      })

      if (!user) {
        return reply.code(404).send({ message: 'Incorrect email or password!' })
      }

      const isPasswordCorrect = await bcrypt.compare(request.body.password, user.password)

      if (!isPasswordCorrect) {
        return reply.code(404).send({ message: 'Incorrect email or password!' })
      }

      return reply.code(201).send(user)
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError || err instanceof Error) {
        return reply.code(500).send({ message: err.message })
      }
      return reply.code(500).send({ message: 'Something went wrong' })
    }
  })
}
