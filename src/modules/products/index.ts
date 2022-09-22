import { createProduct, getProducts } from './products.handlers'
import { createProductSchema } from './products.schema'

import type { FastifyPluginCallback } from 'fastify'

export const productsRoutes: FastifyPluginCallback = (fastify, _options, done) => {
  fastify.post('/', { schema: createProductSchema }, createProduct)
  fastify.get('/', getProducts)

  done()
}
