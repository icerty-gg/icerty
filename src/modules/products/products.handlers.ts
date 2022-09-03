import type { FastifyRequest } from 'fastify'

export const createProduct = (
  request: FastifyRequest<{ readonly Body: { readonly name: string; readonly surname: string } }>
) => {
  const { name, surname } = request.body

  return { user: { name, surname } }
}
