import path from "path";

import supertest from "supertest";
import { describe, expect, it } from "vitest";

import fastify from "../../app";

import {
	DEMO_ADMIN,
	DEMO_CATEGORY,
	DEMO_USER,
	createDemoAdminUser,
	createDemoCategory,
	createDemoOffer,
	createDemoUser,
	logInAndReturnCookie,
} from "./../../__tests__/utils";

describe("Tests categories routes", () => {
	describe("GET /categories", () => {
		it("Returns empty array of categories", async () => {
			await supertest(fastify.server)
				.get("/api/categories")
				.expect(200)
				.expect("Content-Type", "application/json; charset=utf-8")
				.then((res) => {
					expect(res.body).toEqual({
						categories: [],
					});
				});
		});

		it("Returns array with one created category", async () => {
			expect(await fastify.prisma.category.count()).toEqual(0);
			const category = await createDemoCategory();

			await supertest(fastify.server)
				.get("/api/categories")
				.expect(200)
				.expect("Content-Type", "application/json; charset=utf-8")
				.then((res) => {
					const body = res.body as {
						categories: {
							id: string;
							name: string;
							img: string;
							createdAt: string;
							updatedAt: string;
						}[];
					};
					expect(body.categories.length).toEqual(1);
					const returnedCategory = body.categories[0];

					expect(returnedCategory).toEqual({
						...category,
						createdAt: category.createdAt.toISOString(),
						updatedAt: category.updatedAt.toISOString(),
					});
				});

			expect(await fastify.prisma.category.count()).toEqual(1);
		});

		describe("POST /categories", () => {
			it("Fails to create category becuase user is not logged in", async () => {
				await supertest(fastify.server)
					.post("/api/categories")
					.expect(401)
					.expect("Content-Type", "application/json; charset=utf-8");
			});

			it("Fails to create category becuase user has no permissions", async () => {
				const user = await createDemoUser();
				const cookie = await logInAndReturnCookie({
					email: user.email,
					password: DEMO_USER.password,
				});

				await supertest(fastify.server)
					.post("/api/categories")
					.set("Cookie", cookie)
					.expect(403)
					.expect("Content-Type", "application/json; charset=utf-8");
			});

			it("Fails to create a category because file mimetype is wrong", async () => {
				const adminUser = await createDemoAdminUser();
				const cookie = await logInAndReturnCookie({
					email: adminUser.email,
					password: DEMO_ADMIN.password,
				});

				await supertest(fastify.server)
					.post("/api/categories")
					.set("Cookie", cookie)
					.field("name", DEMO_CATEGORY.name)
					.attach("img", path.resolve(__dirname, "../../__tests__/testFile.pdf"))
					.expect(400);
			});

			it("Creates a category", async () => {
				const adminUser = await createDemoAdminUser();
				const cookie = await logInAndReturnCookie({
					email: adminUser.email,
					password: DEMO_ADMIN.password,
				});

				expect(await fastify.prisma.category.count()).toEqual(0);

				await supertest(fastify.server)
					.post("/api/categories")
					.set("Cookie", cookie)
					.field("name", DEMO_CATEGORY.name)
					.attach("img", path.resolve(__dirname, "../../__tests__/testImage.png"))
					.expect(204);

				expect(await fastify.prisma.category.count()).toEqual(1);
				expect((await fastify.prisma.category.findFirst())?.name).toEqual(DEMO_CATEGORY.name);
			});
		});
	});

	describe("DELETE /categories/:id", () => {
		it("Fails to delete category because user is not logged in", async () => {
			await supertest(fastify.server)
				.delete("/api/categories/1")
				.expect(401)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Fails to delete category because user has no permissions", async () => {
			const user = await createDemoUser();
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});

			await supertest(fastify.server)
				.delete("/api/categories/1")
				.set("Cookie", cookie)
				.expect(403)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Fails to delete a category because id is wrong", async () => {
			const adminUser = await createDemoAdminUser();
			const cookie = await logInAndReturnCookie({
				email: adminUser.email,
				password: DEMO_ADMIN.password,
			});

			await supertest(fastify.server)
				.delete("/api/categories/1")
				.set("Cookie", cookie)
				.expect(404)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Fails to delete a category because it is used in an offer", async () => {
			const adminUser = await createDemoAdminUser();
			const cookie = await logInAndReturnCookie({
				email: adminUser.email,
				password: DEMO_ADMIN.password,
			});

			const { offer } = await createDemoOffer();

			await supertest(fastify.server)
				.delete(`/api/categories/${offer.categoryId}`)
				.set("Cookie", cookie)
				.expect(403)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Deletes a category", async () => {
			const adminUser = await createDemoAdminUser();
			const cookie = await logInAndReturnCookie({
				email: adminUser.email,
				password: DEMO_ADMIN.password,
			});

			const category = await createDemoCategory();

			expect(await fastify.prisma.category.count()).toEqual(1);

			await supertest(fastify.server)
				.delete(`/api/categories/${category.id}`)
				.set("Cookie", cookie)
				.then((r) => console.log(r.body));

			expect(await fastify.prisma.category.count()).toEqual(0);
		});
	});

	describe("PUT /categories/:id", () => {
		it("Fails to update category because user is not logged in", async () => {
			await supertest(fastify.server)
				.put("/api/categories/1")
				.expect(401)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Fails to update category because user has no permissions", async () => {
			const user = await createDemoUser();
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});

			await supertest(fastify.server)
				.put("/api/categories/1")
				.set("Cookie", cookie)
				.expect(403)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Fails to update a category because id is wrong", async () => {
			const adminUser = await createDemoAdminUser();
			const cookie = await logInAndReturnCookie({
				email: adminUser.email,
				password: DEMO_ADMIN.password,
			});

			await supertest(fastify.server)
				.put("/api/categories/1")
				.set("Cookie", cookie)
				.send({ name: "Basketball" })
				.expect(404)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Updates a category name", async () => {
			const adminUser = await createDemoAdminUser();
			const cookie = await logInAndReturnCookie({
				email: adminUser.email,
				password: DEMO_ADMIN.password,
			});

			const newCategoryName = "Basketball";

			const category = await createDemoCategory();

			expect(
				(await fastify.prisma.category.findFirst({ where: { id: category.id } }))?.name,
			).not.toEqual(newCategoryName);

			await supertest(fastify.server)
				.put(`/api/categories/${category.id}`)
				.set("Cookie", cookie)
				.send({ name: newCategoryName })
				.expect(204);

			expect(
				(await fastify.prisma.category.findFirst({ where: { id: category.id } }))?.name,
			).toEqual(newCategoryName);
		});
	});
});
