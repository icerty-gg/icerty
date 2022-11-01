import fp from 'fastify-plugin'

import { prisma } from './../../utils/prisma'

import type { FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox'
import type { user } from '@prisma/client'
import type { preValidationHookHandler } from 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    auth: (roles: user['role'][]) => preValidationHookHandler
  }

  interface FastifyRequest {
    user: user
  }

  interface Session {
    userId: string
  }
}

const sessionsDecorators: FastifyPluginCallbackTypebox = async (fastify, _options) => {
  fastify.decorateRequest('user', null)

  fastify.decorate('auth', (roles: user['role'][]) => {
    const handler: preValidationHookHandler = async (request, reply) => {
      const { userId } = request.session

      console.log(userId)

      if (!userId) {
        return reply.unauthorized('Unauthorized!')
      }

      const user = await prisma.user.findFirst({
        where: { id: userId }
      })

      if (!user) {
        return reply.unauthorized('Unauthorized!')
      }

      if (!roles.includes(user.role)) {
        throw reply.forbidden()
      }

      request.user = user
    }
    return handler
  })
}

export default fp(sessionsDecorators)
