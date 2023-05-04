import path from "path";

import supertest from "supertest";
import { describe, expect, it } from "vitest";

import fastify from "../../app";

import {
	DEMO_ADMIN,
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

		it("Fails to create an offer because categoryId doesn't exist", async () => {
			const user = await createDemoUser();
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});

			await supertest(fastify.server)
				.post("/api/offers")
				.set("Cookie", cookie)
				.attach("images", path.resolve(__dirname, "../../__tests__/testImage.png"))
				.field("name", "Football")
				.field(
					"description",
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl vitae aliquam luctus, nisl nunc aliquet nunc, quis aliquam nisl nisl vitae nisi. Sed vitae nisl nec nisl aliquam aliquet. Sed vitae nisl nec nisl aliquam aliquet. Sed vitae nisl nec nisl aliquam aliquet. Sed vitae nisl nec nisl aliquam aliquet.",
				)
				.field("price", 100)
				.field("categoryId", 1)
				.field("condition", "new")
				.field("count", 1)
				.field("city", "Warsaw")
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
				.field("name", "Football")
				.field(
					"description",
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl vitae aliquam luctus, nisl nunc aliquet nunc, quis aliquam nisl nisl vitae nisi. Sed vitae nisl nec nisl aliquam aliquet. Sed vitae nisl nec nisl aliquam aliquet. Sed vitae nisl nec nisl aliquam aliquet. Sed vitae nisl nec nisl aliquam aliquet.",
				)
				.field("price", 100)
				.field("count", 1)
				.field("categoryId", category.id)
				.field("condition", "new")
				.field("city", "Warsaw")
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
				.field("name", "Football")
				.field(
					"description",
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl vitae aliquam luctus, nisl nunc aliquet nunc, quis aliquam nisl nisl vitae nisi. Sed vitae nisl nec nisl aliquam aliquet. Sed vitae nisl nec nisl aliquam aliquet. Sed vitae nisl nec nisl aliquam aliquet. Sed vitae nisl nec nisl aliquam aliquet.",
				)
				.field("count", 1)
				.field("price", 100)
				.field("categoryId", category.id)
				.field("condition", "new")
				.field("city", "Warsaw")
				.expect(204);

			expect(await fastify.prisma.offer.count()).toEqual(1);
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
			const admin = await createDemoAdminUser();
			const adminCookie = await logInAndReturnCookie({
				email: admin.email,
				password: DEMO_ADMIN.password,
			});

			await supertest(fastify.server)
				.delete("/api/offers/1")
				.set("Cookie", adminCookie)
				.expect(404)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Deletes an offer successfully", async () => {
			const offer = await createDemoOffer();
			const admin = await createDemoAdminUser();
			const adminCookie = await logInAndReturnCookie({
				email: admin.email,
				password: DEMO_ADMIN.password,
			});

			await supertest(fastify.server)
				.delete(`/api/offers/${offer.id}")}`)
				.set("Cookie", adminCookie)
				.expect(404)
				.expect("Content-Type", "application/json; charset=utf-8");
		});
	});
});
