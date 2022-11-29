import dotenv from 'dotenv'
import Fastify from 'fastify'

import { getPort } from './config'
import { categoriesRoutes } from './modules/categories/categories.routes'
import { productsRoutes } from './modules/products/products.routes'
import sessionsPlugin from './modules/sessions/sessions'
import { userRoutes } from './modules/users/users.routes'

dotenv.config()

const fastify = Fastify({ logger: true })

void fastify.register(import('@fastify/multipart'))
void fastify.register(import('@fastify/sensible'))
void fastify.register(sessionsPlugin)
void fastify.register(productsRoutes, { prefix: '/api/products' })
void fastify.register(categoriesRoutes, { prefix: '/api/categories' })
void fastify.register(userRoutes, { prefix: '/api/users' })

fastify.get('/', () => {
  return { message: 'Hello from api!' }
})

const start = async () => {
  try {
    await fastify.listen({ port: getPort() })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

void start()
