import { prisma } from '../../utils/prisma'

import type { FastifyRequest } from 'fastify'

export const createCategory = async (request: FastifyRequest<{ readonly Body: { readonly name: string } }>) => {
  const { name } = request.body
  const category = await prisma.category.create({ data: { name } })

  return { category }
}

export const getCategories = async () => {
  const categories = await prisma.category.findMany()

  return { categories }
}
