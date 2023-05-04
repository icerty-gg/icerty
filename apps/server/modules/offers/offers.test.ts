import path from "path";

import supertest from "supertest";
import { describe, expect, it } from "vitest";

import fastify from "../../app";

import {
	DEMO_ADMIN,
	DEMO_OFFER,
	DEMO_USER,
	createDemoAdminUser,
	createDemoCategory,
	createDemoOffer,
	createDemoUser,
	logInAndReturnCookie,
} from "./../../__tests__/utils";

describe("Tests offers routes", () => {
	describe("GET /offers", () => {
		it("Returns empty array of offers", async () => {
			await supertest(fastify.server)
				.get("/api/offers")
				.expect(200)
				.expect("Content-Type", "application/json; charset=utf-8")
				.then((res) => {
					expect(res.body).toEqual({
						maxPage: 1,
						offers: [],
						count: 0,
					});
				});
		});
	});

	describe("GET /offers/:id", () => {
		it("Fails because offer is not found", async () => {
			await supertest(fastify.server)
				.get("/api/offers/1")
				.expect(404)
				.expect("Content-Type", "application/json; charset=utf-8");
		});
	});

	describe("POST /offers", () => {
		it("Fails because you are not logged in", async () => {
			await supertest(fastify.server)
				.post("/api/offers")
				.expect(401)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Fails to create an offer because categoryId is wrong", async () => {
			const user = await createDemoUser();
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});

			await supertest(fastify.server)
				.post("/api/offers")
				.set("Cookie", cookie)
				.attach("images", path.resolve(__dirname, "../../__tests__/testImage.png"))
				.field("name", DEMO_OFFER.name)
				.field("description", DEMO_OFFER.description)
				.field("count", DEMO_OFFER.count)
				.field("price", DEMO_OFFER.price)
				.field("condition", DEMO_OFFER.condition)
				.field("city", DEMO_OFFER.city)
				.field("categoryId", 1)
				.expect(404)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Fails to create an offer because file type is invalid", async () => {
			const user = await createDemoUser();
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});

			const category = await createDemoCategory();

			await supertest(fastify.server)
				.post("/api/offers")
				.set("Cookie", cookie)
				.attach("images", path.resolve(__dirname, "../../__tests__/testFile.pdf"))
				.field("name", DEMO_OFFER.name)
				.field("description", DEMO_OFFER.description)
				.field("count", DEMO_OFFER.count)
				.field("price", DEMO_OFFER.price)
				.field("categoryId", category.id)
				.field("condition", DEMO_OFFER.condition)
				.field("city", DEMO_OFFER.city)
				.expect(400);
		});

		it("Creates an offer successfully", async () => {
			const user = await createDemoUser();
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});

			const category = await createDemoCategory();

			expect(await fastify.prisma.offer.count()).toEqual(0);

			await supertest(fastify.server)
				.post("/api/offers")
				.set("Cookie", cookie)
				.attach("images", path.resolve(__dirname, "../../__tests__/testImage.png"))
				.field("name", DEMO_OFFER.name)
				.field("description", DEMO_OFFER.description)
				.field("count", DEMO_OFFER.count)
				.field("price", DEMO_OFFER.price)
				.field("categoryId", category.id)
				.field("condition", DEMO_OFFER.condition)
				.field("city", DEMO_OFFER.city)
				.expect(204);

			expect(await fastify.prisma.offer.count()).toEqual(1);
			expect((await fastify.prisma.offer.findFirst())?.name).toEqual(DEMO_OFFER.name);
			expect((await fastify.prisma.offer.findFirst())?.description).toEqual(DEMO_OFFER.description);
			expect((await fastify.prisma.offer.findFirst())?.count).toEqual(DEMO_OFFER.count);
			expect((await fastify.prisma.offer.findFirst())?.price).toEqual(DEMO_OFFER.price);
			expect((await fastify.prisma.offer.findFirst())?.condition).toEqual(DEMO_OFFER.condition);
			expect((await fastify.prisma.offer.findFirst())?.city).toEqual(DEMO_OFFER.city);
		});
	});

	describe("DELETE /offers/:id", () => {
		it("Fails to delete an offer because user is not logged in", async () => {
			await supertest(fastify.server)
				.delete("/api/offers/1")
				.expect(401)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Fails because offer is not found", async () => {
			const adminUser = await createDemoAdminUser();
			const cookie = await logInAndReturnCookie({
				email: adminUser.email,
				password: DEMO_ADMIN.password,
			});

			await supertest(fastify.server)
				.delete("/api/offers/1")
				.set("Cookie", cookie)
				.expect(404)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Deletes an offer successfully", async () => {
			const offer = await createDemoOffer();
			const adminUser = await createDemoAdminUser();
			const cookie = await logInAndReturnCookie({
				email: adminUser.email,
				password: DEMO_ADMIN.password,
			});

			await supertest(fastify.server)
				.delete(`/api/offers/${offer.id}")}`)
				.set("Cookie", cookie)
				.expect(404)
				.expect("Content-Type", "application/json; charset=utf-8");
		});
	});
});
