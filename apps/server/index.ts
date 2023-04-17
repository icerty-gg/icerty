import { Type } from "@fastify/type-provider-typebox";
import Fastify from "fastify";

import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

const fastify = Fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>();

await fastify.register(import("./plugins/env.js"));
await fastify.register(import("./plugins/supabase.js"));
await fastify.register(import("@fastify/multipart"), { addToBody: true, limits: { files: 5 } });
await fastify.register(import("@fastify/sensible"));
await fastify.register(import("@fastify/swagger"), {
	mode: "dynamic",
	openapi: {
		info: {
			title: `Icerty API`,
			version: "1.0.0",
		},
	},
});
await fastify.register(import("@fastify/swagger-ui"), {
	routePrefix: "/docs",
});
await fastify.register(import("@fastify/cors"), { origin: true, credentials: true });
await fastify.register(import("./plugins/db/db.js"));
await fastify.register(import("./modules/sessions/sessions.js"));
await fastify.register(import("./modules/offers/offers.routes.js"), { prefix: "/api/offers" });
await fastify.register(import("./modules/categories/categories.routes.js"), {
	prefix: "/api/categories",
});
await fastify.register(import("./modules/users/users.routes.js"), { prefix: "/api/users" });

fastify.get(
	"/",
	{
		schema: {
			response: {
				200: Type.String(),
			},
		},
	},
	() => "Hello from api!",
);

const start = async () => {
	try {
		await fastify.listen({ port: fastify.config.PORT, host: "0.0.0.0" });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

await start();
