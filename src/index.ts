import errors from '@fastify/sensible'
import Fastify from 'fastify'

import { categoriesRoutes } from './modules/categories/categories.routes'
import { productsRoutes } from './modules/products/products.routes'
import sessionsPlugin from './modules/sessions/sessions'
import { userRoutes } from './modules/users/users.routes'

const fastify = Fastify({ logger: true })

void fastify.register(errors)
void fastify.register(sessionsPlugin)
void fastify.register(productsRoutes, { prefix: '/api/products' })
void fastify.register(categoriesRoutes, { prefix: '/api/categories' })
void fastify.register(userRoutes, { prefix: '/api/users' })

fastify.get('/', () => {
  return { message: 'Hello from api!' }
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

void start()
