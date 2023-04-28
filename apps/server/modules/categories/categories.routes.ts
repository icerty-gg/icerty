import { randomUUID } from "crypto";

import {
	createCategorySchema,
	deleteCategorySchema,
	updateCategorySchema,
	getCategoriesSchema,
} from "./categories.schemas.js";

import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import type { FastifyPluginAsync } from "fastify";

const categoriesPlugin: FastifyPluginAsync = async (fastify) => {
	fastify
		.withTypeProvider<TypeBoxTypeProvider>()
		.get("/", { schema: getCategoriesSchema }, async (request, reply) => {
			const categories = await fastify.prisma.category.findMany();

			return reply.code(200).send({
				categories: categories.map((c) => ({
					...c,
					updatedAt: c.updatedAt.toISOString(),
					createdAt: c.createdAt.toISOString(),
				})),
			});
		});

	fastify
		.withTypeProvider<TypeBoxTypeProvider>()
		.post(
			"/",
			{ schema: createCategorySchema, preValidation: fastify.auth(["admin"]) },
			async (request, reply) => {
				const { img, name } = request.body;

				const firstImg = img[0];

				if (img.some((file) => !["image/png", "image/jpeg"].includes(file.mimetype))) {
					throw reply.badRequest(
						"Invalid image mimetype! Supported mimetypes: image/png, image/jpeg",
					);
				}

				if (img.length > 1 || !firstImg) {
					throw reply.badRequest("Image must be a single file!");
				}

				const { data, error } = await fastify.supabase.storage
					.from("categories")
					.upload(randomUUID(), firstImg.data, {
						contentType: firstImg.mimetype,
					});

				if (error) {
					throw reply.internalServerError(error.message);
				}

				const { data: url } = fastify.supabase.storage.from("categories").getPublicUrl(data.path);

				await fastify.prisma.category.create({ data: { name, img: url.publicUrl } });

				return reply.code(204).send();
			},
		);

	fastify
		.withTypeProvider<TypeBoxTypeProvider>()
		.delete(
			"/:id",
			{ schema: deleteCategorySchema, preValidation: fastify.auth(["admin"]) },
			async (request, reply) => {
				const { id } = request.params;
				const category = await fastify.prisma.category.findFirst({
					where: {
						id,
					},
				});

				const offer = await fastify.prisma.offer.findFirst({
					where: {
						categoryId: id,
					},
				});

				if (offer) {
					throw reply.forbidden("This category is used in some offers!");
				}

				if (!category) {
					throw reply.notFound("Category not found!");
				}

				await fastify.prisma.category.delete({
					where: {
						id,
					},
				});

				return reply.code(204).send();
			},
		);
	fastify
		.withTypeProvider<TypeBoxTypeProvider>()
		.put(
			"/:id",
			{ schema: updateCategorySchema, preValidation: fastify.auth(["admin"]) },
			async (request, reply) => {
				const { id } = request.params;
				const { name } = request.body;

				const category = await fastify.prisma.category.findFirst({
					where: {
						id,
					},
				});

				if (!category) {
					throw reply.notFound("Category not found!");
				}

				await fastify.prisma.category.update({
					where: {
						id,
					},
					data: {
						name,
					},
				});

				return reply.code(204).send();
			},
		);
};

export default categoriesPlugin;
