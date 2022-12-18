import fp from 'fastify-plugin'

import type { User } from '../users/users.schemas'
import type { FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox'
import type { preValidationHookHandler } from 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    auth: (roles?: User['role'][]) => preValidationHookHandler
  }

  interface Session {
    user: User
  }
}

const sessionsDecorators: FastifyPluginCallbackTypebox = async (fastify, _options) => {
  fastify.decorate('auth', (roles?: User['role'][]) => {
    const handler: preValidationHookHandler = async (request, reply) => {
      const { user } = request.session

      if (!user) {
        return reply.unauthorized('You need to be logged in!')
      }

      if (roles && !roles.includes(user.role)) {
        throw reply.forbidden(`This action is only available for roles: ${roles.join(' ')} `)
      }
    }
    return handler
  })
}

export default fp(sessionsDecorators)
