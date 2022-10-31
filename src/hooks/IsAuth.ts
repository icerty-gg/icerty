import { prisma } from '../utils/prisma'

import type { preValidationHookHandler } from 'fastify'

export const isAuth: preValidationHookHandler = async (request, reply) => {
  const { token } = request.cookies

  if (!token) {
    throw reply.unauthorized('You need to be logged in!')
  }

  const isAuthorized = await prisma.auth_tokens.findFirst({ where: { token }, include: { user: true } })

  if (!isAuthorized) {
    throw reply.unauthorized('You need to be logged in!')
  }

  request.user = isAuthorized.user
}
