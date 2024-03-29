import { Type } from "@fastify/type-provider-typebox";

import { BufferType } from "../../utils/schema.js";

import type { FastifySchema } from "fastify";

export const CategorySchema = Type.Object({
	id: Type.String(),
	name: Type.String({ minLength: 3 }),
	updatedAt: Type.String(),
	createdAt: Type.String(),
	img: Type.String(),
});

export const getCategoriesSchema = {
	tags: ["categories"],
	summary: "Get all categories",
	response: {
		200: Type.Object({
			categories: Type.Array(CategorySchema),
		}),
	},
} satisfies FastifySchema;

export const createCategorySchema = {
	tags: ["categories"],
	summary: "Create category",
	consumes: ["multipart/form-data"],
	body: Type.Object({
		name: CategorySchema.properties.name,
		img: Type.Array(
			Type.Object({
				data: BufferType,
				filename: Type.String(),
				encoding: Type.String(),
				mimetype: Type.String(),
				limit: Type.Boolean(),
			}),
		),
	}),
	response: {
		204: Type.Void(),
	},
} satisfies FastifySchema;

export const deleteCategorySchema = {
	tags: ["categories"],
	summary: "Delete category by id",
	params: Type.Object({
		id: CategorySchema.properties.id,
	}),
	response: {
		204: Type.Void(),
	},
} satisfies FastifySchema;

export const updateCategorySchema = {
	tags: ["categories"],
	summary: "Update category by id",
	body: Type.Object({
		name: CategorySchema.properties.name,
	}),
	params: Type.Object({
		id: CategorySchema.properties.id,
	}),
	response: {
		204: Type.Void(),
	},
} satisfies FastifySchema;
