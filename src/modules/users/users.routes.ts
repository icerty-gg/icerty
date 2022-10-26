import bcrypt from 'bcrypt'

import { prisma } from '../../utils/prisma'

import { isAuth } from './../../utils/IsAuth'
import { createUserSchema, getCurrentUserSchema } from './users.schema'

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyPluginAsync } from 'fastify'

export const userRoutes: FastifyPluginAsync = async fastify => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post('/register', { schema: createUserSchema }, async (request, reply) => {
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
    })

  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get('/me', { schema: getCurrentUserSchema, preValidation: isAuth }, async (request, reply) => {
      const { token } = request.cookies

      const currentUser = await prisma.auth_tokens.findFirst({ where: { token }, include: { user: true } })

      if (!currentUser) {
        return reply.code(404).send({ message: 'User not found!' })
      }

      return reply.code(200).send({ ...currentUser.user })
    })
}
