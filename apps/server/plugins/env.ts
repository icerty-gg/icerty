import fastifyEnv from "@fastify/env";
import { Type } from "@fastify/type-provider-typebox";
import fp from "fastify-plugin";

import type { Static } from "@fastify/type-provider-typebox";
import type { FastifyPluginAsync } from "fastify";

const EnvSchema = Type.Object({
	PORT: Type.Number(),
	COOKIE_SECRET: Type.String(),
	NODE_ENV: Type.Union([
		Type.Literal("development"),
		Type.Literal("production"),
		Type.Literal("test"),
	]),
	SUPABASE_API_SECRET: Type.String(),
	SUPABASE_URL: Type.String(),
});

declare module "fastify" {
	interface FastifyInstance {
		config: Static<typeof EnvSchema>;
	}
}

const envPlugin: FastifyPluginAsync = async (fastify) => {
	await fastify.register(fastifyEnv, {
		schema: EnvSchema,
		dotenv: true,
	});
};

export default fp(envPlugin);
