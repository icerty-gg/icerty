import Fastify from 'fastify'

import { productsRoutes } from './modules/products/index'

const fastify = Fastify({
  logger: true
})

fastify.get('/', () => {
  return { message: 'Hello from the api!' }
})

void fastify.register(productsRoutes, { prefix: '/api/products' })

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

void start()
