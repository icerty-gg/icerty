import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import FP from "fastify-plugin";

import { PrismaErrorCode } from "./prismaErrors.js";

import type { FastifyPluginAsync } from "fastify";

declare module "fastify" {
	interface FastifyInstance {
		prisma: PrismaClient;
	}
}

const db: FastifyPluginAsync = async (fastify) => {
	const prisma = new PrismaClient();

	fastify.addHook("onClose", () => prisma.$disconnect());
	fastify.decorate("prisma", prisma);

	const defaultErrorHandler = fastify.errorHandler;

	fastify.setErrorHandler((err, request, reply) => {
		if (err instanceof PrismaClientKnownRequestError) {
			switch (err.code) {
				case PrismaErrorCode.UniqueKeyViolation:
					return fastify.httpErrors.badRequest(err.message);
				case PrismaErrorCode.ForeignKeyViolation:
					return fastify.httpErrors.badRequest(err.message);
			}
		}

		return defaultErrorHandler(err, request, reply);
	});
};

const dbPlugin = FP(db);

export default dbPlugin;
