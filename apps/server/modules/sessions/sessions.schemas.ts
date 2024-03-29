import { Type } from "@fastify/type-provider-typebox";

import { UserSchema, PasswordSchema } from "../users/users.schemas.js";

import type { FastifySchema } from "fastify";

export const loginSchema = {
	tags: ["sessions"],
	summary: "Login",
	body: Type.Object({
		email: UserSchema.properties.email,
		password: PasswordSchema,
	}),
	response: {
		201: UserSchema,
	},
} satisfies FastifySchema;

export const logoutSchema = {
	tags: ["sessions"],
	summary: "Logout",
	response: {
		204: Type.Void(),
	},
} satisfies FastifySchema;

export const getSessionSchema = {
	tags: ["sessions"],
	summary: "Get currently logged user",
	response: {
		200: UserSchema,
	},
} satisfies FastifySchema;
