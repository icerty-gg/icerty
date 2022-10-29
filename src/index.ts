import cookie from '@fastify/cookie'
import errors from '@fastify/sensible'
import Fastify from 'fastify'

import { categoriesRoutes } from './modules/categories/categories.routes'
import { productsRoutes } from './modules/products/products.routes'
import { sessionRoutes } from './modules/sessions/sessions.routes'
import { userRoutes } from './modules/users/users.routes'
import { clearTokens } from './utils/clearTokens'

const fastify = Fastify({ logger: true })

fastify.get('/', () => {
  return { message: 'Hello from api!' }
})

// plugins
void fastify.register(cookie)
void fastify.register(errors)

// routes
void fastify.register(productsRoutes, { prefix: '/api/products' })
void fastify.register(categoriesRoutes, { prefix: '/api/categories' })
void fastify.register(userRoutes, { prefix: '/api/users' })
void fastify.register(sessionRoutes, { prefix: '/api/sessions' })

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
    clearTokens()
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

void start()
