import cookie from '@fastify/cookie'
import Fastify from 'fastify'

import { categoriesRoutes } from './modules/categories/categories.routes'
import { productsRoutes } from './modules/products/products.routes'
import { userRoutes } from './modules/users/users.routes'
import { isAuth } from './utils/IsAuth'

const fastify = Fastify({ logger: true })

fastify.get('/', () => {
  return { message: 'Hello from api!' }
})

// plugins
void fastify.register(cookie)

// routes
void fastify.register(productsRoutes, { prefix: '/api/products' }).addHook('preHandler', isAuth)
void fastify.register(categoriesRoutes, { prefix: '/api/categories' }).addHook('preHandler', isAuth)
void fastify.register(userRoutes, { prefix: '/api/users' })

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

void start()
