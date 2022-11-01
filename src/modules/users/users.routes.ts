import bcrypt from 'bcrypt'

import { prisma } from '../../utils/prisma'

import { createUserSchema, deleteCurrentUserSchema, deleteUserByIdSchema } from './users.schema'

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyPluginAsync } from 'fastify'

export const userRoutes: FastifyPluginAsync = async fastify => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post('/register', { schema: createUserSchema }, async (request, reply) => {
      const { email, name, password, role, surname } = request.body

      const isUserRegistered = await prisma.user.findFirst({ where: { email } })

      if (isUserRegistered) {
        throw reply.conflict('This email is already taken!')
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await prisma.user.create({
        data: { name, role, surname, email: email.toLowerCase(), password: hashedPassword }
      })

      return reply.code(201).send(user)
    })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .delete('/me', { schema: deleteCurrentUserSchema }, async (request, reply) => {
      if (!request.session.user) {
        throw reply.unauthorized('You need to be logged in!')
      }

      const deletedUser = await prisma.user.delete({ where: { id: request.user.id } })

      return reply.code(200).send(deletedUser)
    })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .delete(
      '/:id',
      { schema: deleteUserByIdSchema, preValidation: fastify.auth(['ADMIN']) },
      async (request, reply) => {
        const { id } = request.params

        const deletedUser = await prisma.user.findFirst({ where: { id } })

        if (!deletedUser) {
          throw reply.notFound('User not found!')
        }

        await prisma.user.delete({ where: { id } })

        return reply.code(200).send(deletedUser)
      }
    )
}
