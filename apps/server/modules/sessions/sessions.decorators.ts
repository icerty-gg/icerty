import fp from "fastify-plugin";

import type { User } from "../users/users.schemas.js";
import type { FastifyPluginAsync, preValidationHookHandler } from "fastify";

declare module "fastify" {
	interface FastifyInstance {
		auth: (roles?: User["role"][]) => preValidationHookHandler;
	}

	interface Session {
		user: User;
	}
}

const sessionsDecorators: FastifyPluginAsync = async (fastify) => {
	fastify.decorate("auth", (roles?: User["role"][]) => {
		const handler: preValidationHookHandler = async (request, reply) => {
			const { user } = request.session;

			if (!user) {
				return reply.unauthorized("You need to be logged in!");
			}

			if (roles && !roles.includes(user.role)) {
				throw reply.forbidden(`This action is only available for roles: ${roles.join(" ")} `);
			}
		};
		return handler;
	});
};

export default fp(sessionsDecorators);
