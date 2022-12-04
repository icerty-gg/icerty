import FP from 'fastify-plugin'
import ms from 'ms'

import type { FastifyPluginAsync } from 'fastify'

const session: FastifyPluginAsync = async fastify => {
  if (!process.env.COOKIE_SECRET) {
    throw new Error('Cookie secret is not defined')
  }

  await fastify.register(import('@fastify/cookie'))
  await fastify.register(import('@fastify/session'), {
    cookieName: 'session',
    secret: process.env.COOKIE_SECRET,
    cookie: {
      sameSite: 'lax',
      httpOnly: true,
      secure: false,
      maxAge: ms('7 days')
    }
  })
  await fastify.register(import('./sessions.decorators'))

  await fastify.register(import('./sessions.routes'), { prefix: '/api/sessions' })
}

const sessionsPlugin = FP(session)

export default sessionsPlugin
