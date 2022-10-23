import { prisma } from './prisma'

import type { preValidationHookHandler } from 'fastify'

export const isAuth: preValidationHookHandler = async (request, reply) => {
  const { token } = request.cookies

  if (!token) {
    return reply.code(403).send({ message: 'Forbidden!' })
  }

  const isAuthorized = await prisma.auth_tokens.findFirst({ where: { token } })

  if (!isAuthorized) {
    return reply.code(403).send({ message: 'Forbidden!' })
  }
}
