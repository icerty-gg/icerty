import { createProduct, getProducts } from './products.handlers'

import type { FastifyPluginCallback } from 'fastify'

export const productsRoutes: FastifyPluginCallback = (fastify, _options, done) => {
  fastify.post('/', createProduct)
  fastify.get('/', getProducts)

  done()
}
