import { Type } from "@fastify/type-provider-typebox";

import { BufferType, StringEnum } from "../../utils/schema.js";
import { CategorySchema } from "../categories/categories.schemas.js";
import { UserSchema } from "../users/users.schemas.js";

import type { FastifySchema } from "fastify";

export const OfferSchema = Type.Object({
	id: Type.String(),
	name: Type.String({ minLength: 8, maxLength: 50 }),
	description: Type.String({ minLength: 50, maxLength: 1500 }),
	categoryId: Type.String(),
	userId: Type.String(),
	count: Type.Number({ minimum: 1 }),
	price: Type.Number({ minimum: 1 }),
	isPromoted: Type.Boolean(),
	updatedAt: Type.String(),
	createdAt: Type.String(),
	city: Type.String({ minLength: 3, maxLength: 50 }),
	condition: StringEnum(["new", "used"]),
	images: Type.Array(
		Type.Object({
			id: Type.String(),
			img: Type.String(),
		}),
	),
});

export const getAllOffersSchema = {
	tags: ["offers"],
	summary: "Get all offers",
	querystring: Type.Object({
		take: Type.Number({ minimum: 1, default: 20, maximum: 50 }),
		city: Type.Optional(Type.String({ minLength: 1 })),
		name: Type.Optional(Type.String({ minLength: 1 })),
		page: Type.Number({ minimum: 1, default: 1 }),
		price_from: Type.Optional(Type.Number({ minimum: 1 })),
		price_to: Type.Optional(Type.Number({ minimum: 1 })),
		count_from: Type.Optional(Type.Number({ minimum: 1 })),
		count_to: Type.Optional(Type.Number({ minimum: 1 })),
		promoted: Type.Optional(Type.Boolean()),
		followed: Type.Optional(Type.Boolean()),
		category: Type.Optional(Type.String({ minLength: 1 })),
		order_direction: StringEnum(["asc", "desc"], "asc"),
		order_by: StringEnum(["price", "createdAt"], "createdAt"),
	}),
	response: {
		200: Type.Object({
			maxPage: Type.Number({ minimum: 0 }),
			offers: Type.Array(
				Type.Object({
					image: Type.String(),
					user: Type.Object({
						name: UserSchema.properties.name,
						surname: UserSchema.properties.surname,
						img: UserSchema.properties.img,
					}),
					categoryName: CategorySchema.properties.name,
					isFollowed: Type.Boolean(),
					id: OfferSchema.properties.id,
					name: OfferSchema.properties.name,
					description: OfferSchema.properties.description,
					count: OfferSchema.properties.count,
					price: OfferSchema.properties.price,
					isPromoted: OfferSchema.properties.isPromoted,
					updatedAt: OfferSchema.properties.updatedAt,
					createdAt: OfferSchema.properties.createdAt,
					city: OfferSchema.properties.city,
					condition: OfferSchema.properties.condition,
				}),
			),
			count: Type.Number({ minimum: 0 }),
		}),
	},
} satisfies FastifySchema;

export const getOfferSchema = {
	tags: ["offers"],
	summary: "Get offer by id",
	params: Type.Object({
		id: OfferSchema.properties.id,
	}),
	response: {
		200: Type.Object({
			id: OfferSchema.properties.id,
			name: OfferSchema.properties.name,
			description: OfferSchema.properties.description,
			count: OfferSchema.properties.count,
			price: OfferSchema.properties.price,
			isPromoted: OfferSchema.properties.isPromoted,
			updatedAt: OfferSchema.properties.updatedAt,
			createdAt: OfferSchema.properties.createdAt,
			city: OfferSchema.properties.city,
			condition: OfferSchema.properties.condition,
			images: OfferSchema.properties.images,
			user: Type.Object({
				name: UserSchema.properties.name,
				surname: UserSchema.properties.surname,
				img: UserSchema.properties.img,
				email: UserSchema.properties.email,
				createdAt: UserSchema.properties.createdAt,
			}),
			category: Type.Object({
				name: CategorySchema.properties.name,
				img: CategorySchema.properties.img,
			}),
			isFollowed: Type.Boolean(),
		}),
	},
} satisfies FastifySchema;

export const createOfferSchema = {
	tags: ["offers"],
	summary: "Create offer",
	consumes: ["multipart/form-data"],
	body: Type.Object({
		name: OfferSchema.properties.name,
		description: OfferSchema.properties.description,
		count: OfferSchema.properties.count,
		price: OfferSchema.properties.price,
		categoryId: OfferSchema.properties.categoryId,
		city: OfferSchema.properties.city,
		condition: OfferSchema.properties.condition,
		images: Type.Array(
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

export const deleteOfferSchema = {
	tags: ["offers"],
	summary: "Delete offer by id",
	params: Type.Object({
		id: OfferSchema.properties.id,
	}),
	response: {
		204: Type.Void(),
	},
} satisfies FastifySchema;

export const updateOfferSchema = {
	tags: ["offers"],
	summary: "Update offer by id",
	body: Type.Object({
		name: Type.Optional(OfferSchema.properties.name),
		description: Type.Optional(OfferSchema.properties.description),
		count: Type.Optional(OfferSchema.properties.count),
		price: Type.Optional(OfferSchema.properties.price),
		categoryId: Type.Optional(OfferSchema.properties.categoryId),
		isPromoted: Type.Optional(OfferSchema.properties.isPromoted),
		city: Type.Optional(OfferSchema.properties.city),
		condition: Type.Optional(OfferSchema.properties.condition),
	}),
	params: Type.Object({
		id: OfferSchema.properties.id,
	}),
	response: {
		204: Type.Void(),
	},
} satisfies FastifySchema;

export const followOfferSchema = {
	tags: ["offers"],
	summary: "Follow offer by id",
	params: Type.Object({
		id: OfferSchema.properties.id,
	}),
	response: {
		204: Type.Void(),
	},
} satisfies FastifySchema;

export const unfollowOfferSchema = {
	tags: ["offers"],
	summary: "Unfollow offer by id",
	params: Type.Object({
		id: OfferSchema.properties.id,
	}),
	response: {
		204: Type.Void(),
	},
} satisfies FastifySchema;
