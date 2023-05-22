import { afterAll, afterEach, beforeAll } from "vitest";

import fastify from "../app";

const clearDatabase = async () => {
	await fastify.prisma.followedOffers.deleteMany();
	await fastify.prisma.offerImage.deleteMany();
	await fastify.prisma.offer.deleteMany();
	await fastify.prisma.category.deleteMany();
	await fastify.prisma.user.deleteMany();
};

const clearSupabase = async () => {
	await fastify.supabase.storage.emptyBucket("categories");
	await fastify.supabase.storage.emptyBucket("offers");
};

beforeAll(async () => {
	await fastify.ready();
	await clearDatabase();
	await clearSupabase();
});

afterAll(async () => {
	await fastify.close();
	await clearSupabase();
});

afterEach(async () => {
	await clearDatabase();
	await clearSupabase();
});
