import { createCategory, getCategories } from './categories.handlers'

import type { FastifyPluginCallback } from 'fastify'

export const categoriesRoutes: FastifyPluginCallback = (fastify, _options, done) => {
  fastify.post('/', createCategory)
  fastify.get('/', getCategories)
  done()
}
