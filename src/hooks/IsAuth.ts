import { prisma } from '../utils/prisma'

import type { preValidationHookHandler } from 'fastify'

export const isAuth: preValidationHookHandler = async (request, reply) => {
  const { token } = request.cookies

  if (!token) {
    throw reply.unauthorized('You need to be logged in!')
  }

  const isAuthorized = await prisma.auth_tokens.findFirst({ where: { token } })

  if (!isAuthorized) {
    throw reply.unauthorized('You need to be logged in!')
  }
}
