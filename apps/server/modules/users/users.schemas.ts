import { Type, Static } from "@fastify/type-provider-typebox";

import { StringEnum } from "../../utils/schema.js";

import type { FastifySchema } from "fastify";

export const PasswordSchema = Type.String({ minLength: 8, maxLength: 20 });

export const UserSchema = Type.Object({
	id: Type.String(),
	name: Type.String({ minLength: 3, maxLength: 16 }),
	surname: Type.String({ minLength: 3, maxLength: 20 }),
	img: Type.String(),
	email: Type.String({ format: "email" }),
	password: Type.String(),
	role: StringEnum(["admin", "user"]),
	createdAt: Type.String(),
});

export type User = Static<typeof UserSchema>;

export const createUserSchema = {
	tags: ["users"],
	summary: "Create user",
	body: Type.Object({
		email: UserSchema.properties.email,
		name: UserSchema.properties.name,
		surname: UserSchema.properties.surname,
		password: PasswordSchema,
	}),
	response: {
		201: UserSchema,
	},
} satisfies FastifySchema;

export const deleteCurrentUserSchema = {
	tags: ["users"],
	summary: "Delete current user",
	response: {
		204: Type.Void(),
	},
} satisfies FastifySchema;

export const deleteUserByIdSchema = {
	tags: ["users"],
	summary: "Delete user by id",
	params: Type.Object({
		id: UserSchema.properties.id,
	}),
	response: {
		204: Type.Void(),
	},
} satisfies FastifySchema;

export const updatePasswordSchema = {
	tags: ["users"],
	summary: "Update password",
	body: Type.Object({
		oldPassword: PasswordSchema,
		newPassword: PasswordSchema,
	}),
	response: {
		204: Type.Void(),
	},
} satisfies FastifySchema;

export const updateEmailSchema = {
	tags: ["users"],
	summary: "Update email",
	body: Type.Object({
		email: UserSchema.properties.email,
	}),
	response: {
		204: Type.Void(),
	},
} satisfies FastifySchema;
