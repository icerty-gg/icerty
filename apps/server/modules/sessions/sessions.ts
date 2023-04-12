import FP from "fastify-plugin";
import ms from "ms";

import type { FastifyPluginAsync } from "fastify";

const session: FastifyPluginAsync = async (fastify) => {
	await fastify.register(import("@fastify/cookie"));
	await fastify.register(import("@fastify/session"), {
		cookieName: "session",
		secret: fastify.config.COOKIE_SECRET,
		cookie: {
			sameSite: "lax",
			httpOnly: true,
			secure: fastify.config.NODE_ENV === "production",
			maxAge: ms("7 days"),
		},
	});
	await fastify.register(import("./sessions.decorators.js"));

	await fastify.register(import("./sessions.routes.js"), { prefix: "/api/sessions" });
};

const sessionsPlugin = FP(session);

export default sessionsPlugin;
