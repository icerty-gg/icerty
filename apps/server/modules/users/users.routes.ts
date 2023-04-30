import { comparePasswords, hashPassword } from "../../utils/password.js";

import {
	createUserSchema,
	deleteCurrentUserSchema,
	deleteUserByIdSchema,
	updateEmailSchema,
	updatePasswordSchema,
} from "./users.schemas.js";

import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import type { FastifyPluginAsync } from "fastify";

const usersPlugin: FastifyPluginAsync = async (fastify) => {
	fastify
		.withTypeProvider<TypeBoxTypeProvider>()
		.post("/register", { schema: createUserSchema }, async (request, reply) => {
			const { email, name, password, surname } = request.body;

			const isUserRegistered = await fastify.prisma.user.findFirst({ where: { email } });

			if (isUserRegistered) {
				throw reply.conflict("This email is already taken!");
			}

			const hashedPassword = await hashPassword(password);

			const user = await fastify.prisma.user.create({
				data: { name, surname, email: email.toLocaleLowerCase(), password: hashedPassword },
			});

			return reply.code(201).send({ ...user, createdAt: user.createdAt.toISOString() });
		});

	fastify
		.withTypeProvider<TypeBoxTypeProvider>()
		.delete(
			"/me",
			{ schema: deleteCurrentUserSchema, preValidation: fastify.auth() },
			async (request, reply) => {
				await fastify.prisma.user.delete({ where: { id: request.session.user.id } });

				return reply.code(204).send();
			},
		);

	fastify
		.withTypeProvider<TypeBoxTypeProvider>()
		.delete(
			"/:id",
			{ schema: deleteUserByIdSchema, preValidation: fastify.auth(["admin"]) },
			async (request, reply) => {
				const { id } = request.params;

				const deletedUser = await fastify.prisma.user.findFirst({ where: { id } });

				if (!deletedUser) {
					throw reply.notFound("User not found!");
				}

				await fastify.prisma.user.delete({ where: { id } });

				return reply.code(204).send();
			},
		);

	fastify
		.withTypeProvider<TypeBoxTypeProvider>()
		.put(
			"/password",
			{ schema: updatePasswordSchema, preValidation: fastify.auth() },
			async (request, reply) => {
				const { newPassword, oldPassword } = request.body;
				const { user } = request.session;

				if (!(await comparePasswords(oldPassword, user.password))) {
					throw reply.conflict("Invalid old password provided!");
				}

				const hashedPassword = await hashPassword(newPassword);

				await fastify.prisma.user.update({
					where: { id: user.id },
					data: {
						password: hashedPassword,
					},
				});

				return reply.code(204).send();
			},
		);

	fastify
		.withTypeProvider<TypeBoxTypeProvider>()
		.put(
			"/email",
			{ schema: updateEmailSchema, preValidation: fastify.auth() },
			async (request, reply) => {
				const { email } = request.body;

				await fastify.prisma.user.update({
					where: { id: request.session.user.id },
					data: {
						email,
					},
				});

				return reply.code(204).send();
			},
		);
};

export default usersPlugin;
