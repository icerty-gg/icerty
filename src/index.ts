import Fastify from 'fastify'

const fastify = Fastify({
	logger: true,
})

fastify.get('/', (req, res) => {
	res.send({ message: 'Hello from the api!' })
})

fastify.listen({ port: 3000 }, (err, address) => {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
	console.log(`Server is now listening on ${address}`)
})
