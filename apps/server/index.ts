import fastify from "./app.js";

const start = async () => {
	try {
		await fastify.listen({ port: fastify.config.PORT, host: "0.0.0.0" });
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

await start();
