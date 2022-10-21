import type { preHandlerAsyncHookHandler } from 'fastify'

export const isAuth: preHandlerAsyncHookHandler = async (request, reply) => {
  const { token } = request.cookies

  console.log(request.cookies)

  if (!token) {
    return reply.code(404).send({ message: 'Unauthorized' })
  }
}
