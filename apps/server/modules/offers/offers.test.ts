import path from "path";

import supertest from "supertest";
import { describe, expect, it } from "vitest";

import fastify from "../../app";

import { DEMO_USER, createUser, logInAndReturnCookie } from "./../../__tests__/utils";

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
			const user = await createUser(DEMO_USER);
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
			const user = await createUser(DEMO_USER);
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});

			const adminUser = await createUser({ ...DEMO_USER, email: "admin@gmail.com", role: "admin" });
			const adminCookie = await logInAndReturnCookie({
				email: adminUser.email,
				password: DEMO_USER.password,
			});

			await supertest(fastify.server)
				.post("/api/categories")
				.set("Cookie", adminCookie)
				.field("name", "Football")
				.attach("img", path.resolve(__dirname, "../../__tests__/testImage.png"))
				.expect(204);

			const categories = await supertest(fastify.server)
				.get("/api/categories")
				.expect(200)
				.expect("Content-Type", "application/json; charset=utf-8");

			const body = categories.body as { categories: { id: string }[] };

			const categoryId = body.categories[0]?.id;

			expect(categoryId).toEqual(expect.any(String));

			if (!categoryId) throw new Error("Category id is undefined");

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
				.field("categoryId", categoryId)
				.field("condition", "new")
				.field("city", "Warsaw")
				.expect(400);
		});

		it("Creates an offer successfully", async () => {
			const user = await createUser(DEMO_USER);
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});

			const adminUser = await createUser({ ...DEMO_USER, email: "admin@gmail.com", role: "admin" });
			const adminCookie = await logInAndReturnCookie({
				email: adminUser.email,
				password: DEMO_USER.password,
			});

			await supertest(fastify.server)
				.post("/api/categories")
				.set("Cookie", adminCookie)
				.field("name", "Football")
				.attach("img", path.resolve(__dirname, "../../__tests__/testImage.png"))
				.expect(204);

			const categories = await supertest(fastify.server)
				.get("/api/categories")
				.expect(200)
				.expect("Content-Type", "application/json; charset=utf-8");

			const body = categories.body as { categories: { id: string }[] };

			const categoryId = body.categories[0]?.id;

			expect(categoryId).toEqual(expect.any(String));

			if (!categoryId) throw new Error("Category id is undefined");

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
				.field("categoryId", categoryId)
				.field("condition", "new")
				.field("city", "Warsaw")
				.expect(204);
		});
	});
});
