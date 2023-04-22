import supertest from "supertest";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

import fastify from "../../app";

beforeAll(async () => {
	await fastify.ready();
	await fastify.prisma.category.createMany({
		data: [
			{
				name: "Football",
				img: "football.png",
			},
			{
				name: "Food",
				img: "food.png",
			},
			{
				name: "School",
				img: "school.png",
			},
		],
	});
});

describe("Tests categories routes", () => {
	it("GET /categories", async () => {
		await supertest(fastify.server)
			.get("/api/categories")
			.expect(200)
			.expect("Content-Type", "application/json; charset=utf-8")
			.then((res) => {
				const body = res.body as { categories: { name: string; img: string }[] };

				expect(body.categories.length).toEqual(3);
				expect(body.categories[0]?.name).toEqual("Football");
				expect(body.categories[0]?.img).toEqual("football.png");
			});
	});
});

afterAll(async () => {
	await fastify.prisma.category.deleteMany();
	await fastify.close();
});
