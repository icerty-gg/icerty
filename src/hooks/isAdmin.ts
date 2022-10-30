import { prisma } from '../utils/prisma'

import type { preValidationHookHandler } from 'fastify'

export const isAdmin: preValidationHookHandler = async (request, reply) => {
  const { token } = request.cookies

  const user = await prisma.auth_tokens.findFirst({ where: { token }, include: { user: true } })

  if (!user) {
    throw reply.unauthorized('You need to be logged in!')
  }

  if (user.user.role === 'USER') {
    throw reply.forbidden('Admin role required!')
  }
}
