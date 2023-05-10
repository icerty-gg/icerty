import { randomUUID } from "crypto";

import {
	createOfferSchema,
	deleteOfferSchema,
	updateOfferSchema,
	getAllOffersSchema,
	getOfferSchema,
	followOfferSchema,
	unfollowOfferSchema,
} from "./offers.schemas.js";

import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import type { Prisma } from "@prisma/client";
import type { FastifyPluginAsync } from "fastify";

const offersPlugin: FastifyPluginAsync = async (fastify) => {
	fastify
		.withTypeProvider<TypeBoxTypeProvider>()
		.get("/", { schema: getAllOffersSchema }, async (request, reply) => {
			const {
				"category[]": category,
				city,
				count_from,
				count_to,
				followed,
				name,
				order_by,
				order_direction,
				page,
				price_from,
				price_to,
				promoted,
				take,
			} = request.query;

			const offersWhereConditions: Prisma.OfferWhereInput = {
				name: {
					contains: name,
					mode: "insensitive",
				},
				city: {
					contains: city,
					mode: "insensitive",
				},
				count: {
					gte: count_from,
					lte: count_to,
				},
				price: {
					gte: price_from,
					lte: price_to,
				},
				isPromoted: promoted,
				category: category
					? {
							name: {
								in: category,
								mode: "insensitive",
							},
					  }
					: undefined,
				followedOffers: followed
					? {
							some: {
								userId: request.session.user?.id,
							},
					  }
					: undefined,
			};

			const offers = await fastify.prisma.offer.findMany({
				skip: (page - 1) * take,
				take,
				orderBy: {
					[order_by]: order_direction,
				},
				where: offersWhereConditions,
				include: {
					offerImage: {
						select: {
							img: true,
						},
					},
					category: {
						select: {
							name: true,
						},
					},
					user: {
						select: {
							name: true,
							surname: true,
							img: true,
						},
					},
					followedOffers: {
						select: {
							offerId: true,
							userId: true,
						},
					},
				},
			});

			const count = await fastify.prisma.offer.count({
				where: offersWhereConditions,
				take,
			});

			const mappedOffers = offers.map((o) => {
				const firstOfferImage = o.offerImage[0];

				if (!firstOfferImage) {
					throw reply.internalServerError(`Offer with id: ${o.id} was created without images!`);
				}

				return {
					...o,
					categoryName: o.category.name,
					createdAt: o.createdAt.toISOString(),
					updatedAt: o.updatedAt.toISOString(),
					image: firstOfferImage.img,
					isFollowed: o.followedOffers.find(
						({ offerId, userId }) => offerId === o.id && userId === request.session.user?.id,
					)
						? true
						: false,
				};
			});

			return reply.code(200).send({
				offers: mappedOffers,
				maxPage: Math.ceil((offers.length === 0 ? 1 : offers.length) / take),
				count,
			});
		});

	fastify
		.withTypeProvider<TypeBoxTypeProvider>()
		.get("/:id", { schema: getOfferSchema }, async (request, reply) => {
			const { id } = request.params;

			const offer = await fastify.prisma.offer.findFirst({
				where: { id },
				include: {
					offerImage: true,
					user: {
						select: {
							img: true,
							name: true,
							surname: true,
							createdAt: true,
							email: true,
						},
					},
					category: {
						select: {
							name: true,
							img: true,
						},
					},
					followedOffers: {
						select: {
							userId: true,
							offerId: true,
						},
					},
				},
			});

			if (!offer) {
				throw reply.notFound("Offer not found!");
			}

			return reply.code(200).send({
				...offer,
				createdAt: offer.createdAt.toISOString(),
				updatedAt: offer.updatedAt.toISOString(),
				images: offer.offerImage,
				user: {
					...offer.user,
					createdAt: offer.user.createdAt.toISOString(),
				},
				category: offer.category,
				isFollowed: offer.followedOffers.find(
					({ offerId, userId }) => offerId === offer.id && userId === request.session.user?.id,
				)
					? true
					: false,
			});
		});

	fastify
		.withTypeProvider<TypeBoxTypeProvider>()
		.post(
			"/",
			{ schema: createOfferSchema, preValidation: fastify.auth() },
			async (request, reply) => {
				const { categoryId, city, condition, count, description, images, name, price } =
					request.body;

				const category = await fastify.prisma.category.findFirst({
					where: { id: categoryId },
				});

				if (!category) {
					throw reply.notFound(`Category with id: ${categoryId} was not found!`);
				}

				if (images.some((file) => !["image/png", "image/jpeg"].includes(file.mimetype))) {
					throw reply.badRequest(
						"Invalid image mimetype! Supported mimetypes: image/png, image/jpeg",
					);
				}

				const promises = images.map(async (file) => {
					const { data, error } = await fastify.supabase.storage
						.from("offers")
						.upload(randomUUID(), file.data, {
							contentType: file.mimetype,
						});

					if (error) {
						throw reply.internalServerError(error.message);
					}

					const { data: url } = fastify.supabase.storage.from("offers").getPublicUrl(data.path);

					return { img: url.publicUrl };
				});

				const urls = await Promise.all(promises);

				await fastify.prisma.offer.create({
					data: {
						count,
						name,
						price,
						description,
						categoryId,
						city,
						condition,
						userId: request.session.user.id,
						offerImage: {
							createMany: {
								data: urls,
							},
						},
					},
				});

				return reply.code(204).send();
			},
		);

	fastify
		.withTypeProvider<TypeBoxTypeProvider>()
		.delete(
			"/:id",
			{ schema: deleteOfferSchema, preValidation: fastify.auth() },
			async (request, reply) => {
				const { id } = request.params;
				const { user } = request.session;

				const offer = await fastify.prisma.offer.findFirst({
					where: { id },
				});

				if (!offer) {
					throw reply.notFound("Offer not found!");
				}

				if (user.role === "user" && offer.userId !== user.id) {
					throw reply.forbidden();
				}

				await fastify.prisma.offer.delete({
					where: { id },
				});

				return reply.code(204).send();
			},
		);

	fastify
		.withTypeProvider<TypeBoxTypeProvider>()
		.put(
			"/:id",
			{ schema: updateOfferSchema, preValidation: fastify.auth() },
			async (request, reply) => {
				const { id } = request.params;

				const { categoryId, city, condition, count, description, isPromoted, name, price } =
					request.body;

				const offer = await fastify.prisma.offer.findFirst({
					where: { id },
				});

				if (!offer || offer.userId !== request.session.user.id) {
					throw reply.notFound("Offer not found!");
				}

				await fastify.prisma.offer.update({
					where: { id },
					data: { count, name, price, categoryId, description, isPromoted, city, condition },
				});

				return reply.code(204).send();
			},
		);

	fastify
		.withTypeProvider<TypeBoxTypeProvider>()
		.post(
			"/follow/:id",
			{ schema: followOfferSchema, preValidation: fastify.auth() },
			async (request, reply) => {
				const { id } = request.params;

				const { id: userId } = request.session.user;

				const offer = await fastify.prisma.offer.findFirst({
					where: { id },
				});
				const followedOffer = await fastify.prisma.followedOffers.findFirst({
					where: { offerId: id, userId },
				});

				if (!offer) {
					throw reply.notFound("Offer not found!");
				}

				if (followedOffer) {
					throw reply.badRequest("You already follow this offer!");
				}

				await fastify.prisma.followedOffers.create({
					data: { offerId: id, userId },
				});

				return reply.code(204).send();
			},
		);

	fastify
		.withTypeProvider<TypeBoxTypeProvider>()
		.delete(
			"/follow/:id",
			{ schema: unfollowOfferSchema, preValidation: fastify.auth() },
			async (request, reply) => {
				const followedOffer = await fastify.prisma.followedOffers.findFirst({
					where: {
						offerId: request.params.id,
						userId: request.session.user.id,
					},
				});

				if (!followedOffer) {
					throw reply.notFound("Offer not found! Either you don't follow it or it doesn't exist!");
				}

				await fastify.prisma.followedOffers.delete({
					where: { id: followedOffer.id },
				});

				return reply.code(204).send();
			},
		);
};

export default offersPlugin;
