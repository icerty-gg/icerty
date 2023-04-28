import { afterAll, afterEach, beforeAll } from "vitest";

import fastify from "./app";

beforeAll(async () => {
	await fastify.ready();
});

afterAll(async () => {
	await fastify.close();
});

afterEach(async () => {
	await fastify.prisma.offerImage.deleteMany();
	await fastify.prisma.offer.deleteMany();
	await fastify.prisma.category.deleteMany();
	await fastify.prisma.user.deleteMany();
	await fastify.prisma.followedOffers.deleteMany();
});
