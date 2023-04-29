import { afterAll, afterEach, beforeAll } from "vitest";

import fastify from "./app";

const clearDatabase = async () => {
	await fastify.prisma.offerImage.deleteMany();
	await fastify.prisma.offer.deleteMany();
	await fastify.prisma.category.deleteMany();
	await fastify.prisma.user.deleteMany();
	await fastify.prisma.followedOffers.deleteMany();
};

beforeAll(async () => {
	await fastify.ready();
	await clearDatabase();
});

afterAll(async () => {
	await fastify.close();
});

afterEach(async () => {
	await clearDatabase();
});
