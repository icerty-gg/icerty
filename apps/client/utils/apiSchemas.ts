import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const postApisessionslogin_Body = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(20),
});
const category_ = z
	.union([
		z.union([z.array(z.string()), z.string()]),
		z.array(z.union([z.array(z.string()), z.string()])),
	])
	.optional();
const postApioffers_Body = z.object({
	name: z.string().min(8).max(50),
	description: z.string().min(50).max(1500),
	count: z.number().gte(1),
	price: z.number().gte(1),
	categoryId: z.string(),
	city: z.string().min(3).max(50),
	condition: z.enum(["new", "used"]),
	images: z.array(
		z.object({
			data: z.unknown(),
			filename: z.string(),
			encoding: z.string(),
			mimetype: z.string(),
			limit: z.boolean(),
		}),
	),
});
const putApioffersId_Body = z
	.object({
		name: z.string().min(8).max(50),
		description: z.string().min(50).max(1500),
		count: z.number().gte(1),
		price: z.number().gte(1),
		categoryId: z.string(),
		isPromoted: z.boolean(),
		city: z.string().min(3).max(50),
		condition: z.enum(["new", "used"]),
	})
	.partial();
const postApicategories_Body = z.object({
	name: z.string().min(3),
	img: z.array(
		z.object({
			data: z.unknown(),
			filename: z.string(),
			encoding: z.string(),
			mimetype: z.string(),
			limit: z.boolean(),
		}),
	),
});
const postApiusersregister_Body = z.object({
	email: z.string().email(),
	name: z.string().min(3).max(16),
	surname: z.string().min(3).max(20),
	password: z.string().min(8).max(20),
});
const putApiuserspassword_Body = z.object({
	oldPassword: z.string().min(8).max(20),
	newPassword: z.string().min(8).max(20),
});

export const schemas = {
	postApisessionslogin_Body,
	category_,
	postApioffers_Body,
	putApioffersId_Body,
	postApicategories_Body,
	postApiusersregister_Body,
	putApiuserspassword_Body,
};

const endpoints = makeApi([
	{
		method: "get",
		path: "/",
		requestFormat: "json",
		response: z.string(),
	},
	{
		method: "get",
		path: "/api/categories/",
		requestFormat: "json",
		response: z.object({
			categories: z.array(
				z.object({
					id: z.string(),
					name: z.string().min(3),
					updatedAt: z.string(),
					createdAt: z.string(),
					img: z.string(),
				}),
			),
		}),
	},
	{
		method: "post",
		path: "/api/categories/",
		requestFormat: "form-data",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: postApicategories_Body,
			},
		],
		response: z.void(),
	},
	{
		method: "delete",
		path: "/api/categories/:id",
		requestFormat: "json",
		parameters: [
			{
				name: "id",
				type: "Path",
				schema: z.string(),
			},
		],
		response: z.void(),
	},
	{
		method: "put",
		path: "/api/categories/:id",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: z.object({ name: z.string().min(3) }),
			},
			{
				name: "id",
				type: "Path",
				schema: z.string(),
			},
		],
		response: z.void(),
	},
	{
		method: "get",
		path: "/api/offers/",
		requestFormat: "json",
		parameters: [
			{
				name: "take",
				type: "Query",
				schema: z.number().gte(1).lte(50).default(20),
			},
			{
				name: "city",
				type: "Query",
				schema: z.string().min(1).optional(),
			},
			{
				name: "name",
				type: "Query",
				schema: z.string().min(1).optional(),
			},
			{
				name: "page",
				type: "Query",
				schema: z.number().gte(1).default(1),
			},
			{
				name: "price_from",
				type: "Query",
				schema: z.number().gte(1).optional(),
			},
			{
				name: "price_to",
				type: "Query",
				schema: z.number().gte(1).optional(),
			},
			{
				name: "count_from",
				type: "Query",
				schema: z.number().gte(1).optional(),
			},
			{
				name: "count_to",
				type: "Query",
				schema: z.number().gte(1).optional(),
			},
			{
				name: "promoted",
				type: "Query",
				schema: z.boolean().optional(),
			},
			{
				name: "followed",
				type: "Query",
				schema: z.boolean().optional(),
			},
			{
				name: "category[]",
				type: "Query",
				schema: category_,
			},
			{
				name: "order_direction",
				type: "Query",
				schema: z.enum(["asc", "desc"]).default("asc"),
			},
			{
				name: "order_by",
				type: "Query",
				schema: z.enum(["price", "createdAt"]).default("createdAt"),
			},
		],
		response: z.object({
			maxPage: z.number().gte(0),
			offers: z.array(
				z.object({
					image: z.string(),
					user: z.object({
						name: z.string().min(3).max(16),
						surname: z.string().min(3).max(20),
						img: z.string(),
					}),
					categoryName: z.string().min(3),
					isFollowed: z.boolean(),
					id: z.string(),
					name: z.string().min(8).max(50),
					description: z.string().min(50).max(1500),
					count: z.number().gte(1),
					price: z.number().gte(1),
					isPromoted: z.boolean(),
					updatedAt: z.string(),
					createdAt: z.string(),
					city: z.string().min(3).max(50),
					condition: z.enum(["new", "used"]),
				}),
			),
			count: z.number().gte(0),
		}),
	},
	{
		method: "post",
		path: "/api/offers/",
		requestFormat: "form-data",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: postApioffers_Body,
			},
		],
		response: z.void(),
	},
	{
		method: "get",
		path: "/api/offers/:id",
		requestFormat: "json",
		parameters: [
			{
				name: "id",
				type: "Path",
				schema: z.string(),
			},
		],
		response: z.object({
			id: z.string(),
			name: z.string().min(8).max(50),
			description: z.string().min(50).max(1500),
			count: z.number().gte(1),
			price: z.number().gte(1),
			isPromoted: z.boolean(),
			updatedAt: z.string(),
			createdAt: z.string(),
			city: z.string().min(3).max(50),
			condition: z.enum(["new", "used"]),
			images: z.array(z.object({ id: z.string(), img: z.string() })),
			user: z.object({
				name: z.string().min(3).max(16),
				surname: z.string().min(3).max(20),
				img: z.string(),
				email: z.string().email(),
				createdAt: z.string(),
			}),
			category: z.object({ name: z.string().min(3), img: z.string() }),
			isFollowed: z.boolean(),
		}),
	},
	{
		method: "delete",
		path: "/api/offers/:id",
		requestFormat: "json",
		parameters: [
			{
				name: "id",
				type: "Path",
				schema: z.string(),
			},
		],
		response: z.void(),
	},
	{
		method: "put",
		path: "/api/offers/:id",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: putApioffersId_Body,
			},
			{
				name: "id",
				type: "Path",
				schema: z.string(),
			},
		],
		response: z.void(),
	},
	{
		method: "post",
		path: "/api/offers/follow/:id",
		requestFormat: "json",
		parameters: [
			{
				name: "id",
				type: "Path",
				schema: z.string(),
			},
		],
		response: z.void(),
	},
	{
		method: "delete",
		path: "/api/offers/follow/:id",
		requestFormat: "json",
		parameters: [
			{
				name: "id",
				type: "Path",
				schema: z.string(),
			},
		],
		response: z.void(),
	},
	{
		method: "post",
		path: "/api/sessions/login",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: postApisessionslogin_Body,
			},
		],
		response: z.object({
			id: z.string(),
			name: z.string().min(3).max(16),
			surname: z.string().min(3).max(20),
			img: z.string(),
			email: z.string().email(),
			password: z.string(),
			role: z.enum(["admin", "user"]),
			createdAt: z.string(),
		}),
	},
	{
		method: "post",
		path: "/api/sessions/logout",
		requestFormat: "json",
		response: z.void(),
	},
	{
		method: "get",
		path: "/api/sessions/me",
		requestFormat: "json",
		response: z.object({
			id: z.string(),
			name: z.string().min(3).max(16),
			surname: z.string().min(3).max(20),
			img: z.string(),
			email: z.string().email(),
			password: z.string(),
			role: z.enum(["admin", "user"]),
			createdAt: z.string(),
		}),
	},
	{
		method: "delete",
		path: "/api/users/:id",
		requestFormat: "json",
		parameters: [
			{
				name: "id",
				type: "Path",
				schema: z.string(),
			},
		],
		response: z.void(),
	},
	{
		method: "put",
		path: "/api/users/email",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: z.object({ email: z.string().email() }),
			},
		],
		response: z.void(),
	},
	{
		method: "delete",
		path: "/api/users/me",
		requestFormat: "json",
		response: z.void(),
	},
	{
		method: "put",
		path: "/api/users/password",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: putApiuserspassword_Body,
			},
		],
		response: z.void(),
	},
	{
		method: "post",
		path: "/api/users/register",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: postApiusersregister_Body,
			},
		],
		response: z.object({
			id: z.string(),
			name: z.string().min(3).max(16),
			surname: z.string().min(3).max(20),
			img: z.string(),
			email: z.string().email(),
			password: z.string(),
			role: z.enum(["admin", "user"]),
			createdAt: z.string(),
		}),
	},
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, endpoints, options);
}
