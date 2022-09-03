import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})

fastify.get('/', () => {
  return { message: 'Hello from the api!' }
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

void start()
