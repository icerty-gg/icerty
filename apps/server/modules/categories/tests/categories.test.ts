import path from "path";

import supertest from "supertest";
import { describe, expect, it } from "vitest";

import fastify from "../../../app";
import { logInAndReturnCookie } from "../../sessions/sessions.test";
import { DEMO_USER } from "../../users/users.test";
import { createUser } from "../../users/users.utils";

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
			const user = await createUser({ ...DEMO_USER, role: "admin" });
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});

			await supertest(fastify.server)
				.get("/api/categories")
				.expect(200)
				.expect("Content-Type", "application/json; charset=utf-8")
				.then((res) => {
					expect(res.body).toEqual({
						categories: [],
					});
				});

			await supertest(fastify.server)
				.post("/api/categories")
				.set("Cookie", cookie)
				.field("name", "Football")
				.attach("img", path.resolve(__dirname, "./testImage.png"))
				.expect(204);

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
					const category = body.categories[0];
					expect(category?.createdAt).toEqual(expect.any(String));
					expect(category?.updatedAt).toEqual(expect.any(String));
					expect(category?.img).toEqual(expect.any(String));
					expect(category?.name).toEqual("Football");
					expect(category?.id).toEqual(expect.any(String));
				});
		});

		describe("POST /categories", () => {
			it("Fails to create category becuase user is not logged in", async () => {
				await supertest(fastify.server).post("/api/categories").expect(401);
			});

			it("Fails to create category becuase user has no permissions", async () => {
				const user = await createUser(DEMO_USER);
				const cookie = await logInAndReturnCookie({
					email: user.email,
					password: DEMO_USER.password,
				});

				await supertest(fastify.server).post("/api/categories").set("Cookie", cookie).expect(403);
			});

			it("Fails to create a category because file mimetype is wrong", async () => {
				const user = await createUser({ ...DEMO_USER, role: "admin" });
				const cookie = await logInAndReturnCookie({
					email: user.email,
					password: DEMO_USER.password,
				});

				await supertest(fastify.server)
					.post("/api/categories")
					.set("Cookie", cookie)
					.field("name", "Football")
					.attach("img", path.resolve(__dirname, "./testFile.pdf"))
					.expect(400);
			});

			it("Creates a category", async () => {
				const user = await createUser({ ...DEMO_USER, role: "admin" });
				const cookie = await logInAndReturnCookie({
					email: user.email,
					password: DEMO_USER.password,
				});

				await supertest(fastify.server)
					.post("/api/categories")
					.set("Cookie", cookie)
					.field("name", "Football")
					.attach("img", path.resolve(__dirname, "./testImage.png"))
					.expect(204);
			});
		});
	});
});
