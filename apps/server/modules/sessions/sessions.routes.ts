import { comparePasswords } from "../../utils/password.js";

import { getSessionSchema, loginSchema, logoutSchema } from "./sessions.schemas.js";

import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import type { FastifyPluginAsync } from "fastify";

const sessionsPlugin: FastifyPluginAsync = async (fastify) => {
	fastify
		.withTypeProvider<TypeBoxTypeProvider>()
		.post("/login", { schema: loginSchema }, async (request, reply) => {
			const { email, password } = request.body;

			if (request.session.user) {
				return reply.forbidden("You are already logged in!");
			}

			const user = await fastify.prisma.user.findFirst({
				where: {
					email: email.toLowerCase(),
				},
			});

			if (!user || !(await comparePasswords(password, user.password))) {
				throw reply.unauthorized("Invalid email or password!");
			}

			request.session.user = { ...user, createdAt: user.createdAt.toISOString() };

			return reply.code(201).send({ ...user, createdAt: user.createdAt.toISOString() });
		});

	fastify
		.withTypeProvider<TypeBoxTypeProvider>()
		.post(
			"/logout",
			{ schema: logoutSchema, preValidation: fastify.auth() },
			async (request, reply) => {
				await request.session.destroy();

				return reply.code(204).send();
			},
		);

	fastify
		.withTypeProvider<TypeBoxTypeProvider>()
		.get(
			"/me",
			{ schema: getSessionSchema, preValidation: fastify.auth() },
			async (request, reply) => {
				return reply.code(200).send(request.session.user);
			},
		);
};

export default sessionsPlugin;
