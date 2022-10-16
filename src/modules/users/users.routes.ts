import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import bcrypt from 'bcrypt'

import { prisma } from '../../utils/prisma'

import { createUserSchema } from './users.schema'

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyPluginAsync } from 'fastify'

export const userRoutes: FastifyPluginAsync = async fastify => {
  fastify.withTypeProvider<TypeBoxTypeProvider>().post('/', { schema: createUserSchema }, async (request, reply) => {
    try {
      const hashedPassword = await bcrypt.hash(request.body.password, 10)

      const user = await prisma.user.create({ data: { ...request.body, password: hashedPassword } })

      return reply.code(201).send(user)
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError || err instanceof Error) {
        return reply.code(500).send({ message: err.message })
      }
      return reply.code(500).send({ message: 'Something went wrong' })
    }
  })
}
