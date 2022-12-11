import fp from 'fastify-plugin'

import type { FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox'
import type { User } from 'common'
import type { preValidationHookHandler } from 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    auth: (roles: User['role'][]) => preValidationHookHandler
  }

  interface FastifyRequest {
    user: User
  }

  interface Session {
    user: User
  }
}

const sessionsDecorators: FastifyPluginCallbackTypebox = async (fastify, _options) => {
  fastify.decorateRequest('user', null)

  fastify.decorate('auth', (roles: User['role'][]) => {
    const handler: preValidationHookHandler = async (request, reply) => {
      const { user } = request.session

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
