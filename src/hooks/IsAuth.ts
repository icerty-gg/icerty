import { prisma } from '../utils/prisma'

import type { User } from './../modules/users/users.schema'
import type { preValidationHookHandler } from 'fastify'

export const isAuth = (roles: readonly User['role'][]) => {
  const handler: preValidationHookHandler = async (request, reply) => {
    const { token } = request.cookies

    if (!token) {
      throw reply.unauthorized('You need to be logged in!')
    }

    const isAuthorized = await prisma.auth_tokens.findFirst({ where: { token }, include: { user: true } })

    if (!isAuthorized) {
      throw reply.unauthorized('You need to be logged in!')
    }

    request.user = isAuthorized.user

    if (!roles.includes(isAuthorized.user.role)) {
      throw reply.forbidden()
    }
  }

  return handler
}
