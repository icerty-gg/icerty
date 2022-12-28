import { Type } from '@sinclair/typebox'
import dotenv from 'dotenv'
import Fastify from 'fastify'

import { getPort } from './config'

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
await fastify.register(import('./modules/db/db'))

await fastify.register(import('./modules/sessions/sessions'))
await fastify.register(import('./modules/offers/offers.routes'), { prefix: '/api/offers' })
await fastify.register(import('./modules/categories/categories.routes'), { prefix: '/api/categories' })
await fastify.register(import('./modules/users/users.routes'), { prefix: '/api/users' })

fastify.get(
  '/',
  {
    schema: {
      response: {
        200: Type.String()
      }
    }
  },
  () => 'Hello from api!'
)

const start = async () => {
  try {
    await fastify.listen({ port: getPort(), host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

await start()
