import Fastify from 'fastify'

import { categoriesRoutes } from './modules/categories/categories.routes'
import { productsRoutes } from './modules/products/products.routes'

const fastify = Fastify({ logger: true })

fastify.get('/', () => {
  return { message: 'Hello from api!' }
})

void fastify.register(productsRoutes, { prefix: '/api/products' })
void fastify.register(categoriesRoutes, { prefix: '/api/categories' })

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

void start()
