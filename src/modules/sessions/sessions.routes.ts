import bcrypt from 'bcrypt'

import { prisma } from '../../utils/prisma'

import { getSessionShema, loginSchema, logoutSchema } from './sessions.schema'

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyPluginAsync } from 'fastify'

const sessionRoutes: FastifyPluginAsync = async fastify => {
  fastify.withTypeProvider<TypeBoxTypeProvider>().post('/login', { schema: loginSchema }, async (request, reply) => {
    const { email, password } = request.body

    if (request.session.userId) {
      return reply.notAcceptable('You are already logged in!')
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email.toLowerCase()
      }
    })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw reply.notFound('Invalid username or password!')
    }

    request.session.userId = user.id

    return reply.code(201).send(user)
  })

  fastify.withTypeProvider<TypeBoxTypeProvider>().post('/logout', { schema: logoutSchema }, async (request, reply) => {
    if (!request.session.userId) {
      throw reply.unauthorized('You need to be logged in!')
    }

    request.session.destroy(() => {
      return reply.code(200).send({ message: 'Logged out' })
    })
  })

  fastify.withTypeProvider<TypeBoxTypeProvider>().get('/me', { schema: getSessionShema }, async (request, reply) => {
    if (!request.session.userId) {
      throw reply.unauthorized('You need to be logged in!')
    }

    return reply.code(200).send(request.user)
  })
}

export default sessionRoutes
