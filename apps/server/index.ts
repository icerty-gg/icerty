import dotenv from 'dotenv'
import Fastify from 'fastify'

import { getPort } from './config'
import { categoriesRoutes } from './modules/categories/categories.routes'
import { offersRoutes } from './modules/offers/offers.routes'
import sessionsPlugin from './modules/sessions/sessions'
import { userRoutes } from './modules/users/users.routes'

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

dotenv.config()

const fastify = Fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>()

await fastify.register(import('@fastify/multipart'), { addToBody: true, limits: { files: 5 } })
await fastify.register(import('@fastify/sensible'))
await fastify.register(import('@fastify/swagger'), {
  mode: 'dynamic',
  openapi: {
    info: {
      title: `Icerty API`,
      version: '1.0.0'
    }
  }
})
await fastify.register(import('@fastify/swagger-ui'), {
  routePrefix: '/docs'
})
await fastify.register(import('@fastify/cors'), { origin: true })
await fastify.register(sessionsPlugin)
await fastify.register(offersRoutes, { prefix: '/api/offers' })
await fastify.register(categoriesRoutes, { prefix: '/api/categories' })
await fastify.register(userRoutes, { prefix: '/api/users' })

fastify.get('/', () => {
  return { message: 'Hello from api!' }
})

const start = async () => {
  try {
    await fastify.listen({ port: getPort(), host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

await start()
