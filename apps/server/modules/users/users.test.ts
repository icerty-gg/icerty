import supertest from "supertest";
import { describe, expect, it } from "vitest";

import fastify from "../../app";

import {
	DEMO_ADMIN,
	DEMO_USER,
	createDemoAdminUser,
	createDemoUser,
	logInAndReturnCookie,
} from "./../../__tests__/utils";
import { User } from "./users.schemas";

describe("Tests users routes", () => {
	describe("POST /users/register ", () => {
		it("Fails because email is taken", async () => {
			await createDemoUser();

			await supertest(fastify.server)
				.post("/api/users/register")
				.send(DEMO_USER)
				.expect(409)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Registers successfully", async () => {
			expect(await fastify.prisma.user.findMany()).toStrictEqual([]);

			await supertest(fastify.server)
				.post("/api/users/register")
				.send(DEMO_USER)
				.expect(201)
				.expect("Content-Type", "application/json; charset=utf-8")
				.then((res) => {
					const body = res.body as User;

					expect(body.name).toEqual(DEMO_USER.name);
					expect(body.surname).toEqual(DEMO_USER.surname);
					expect(body.email).toEqual(DEMO_USER.email);
					expect(body.password).not.toEqual(DEMO_USER.password);
					expect(body.password).toEqual(expect.any(String));
					expect(body.createdAt).toEqual(expect.any(String));
					expect(body.img).toEqual(expect.any(String));
					expect(body.id).toEqual(expect.any(String));
				});
		});
	});

	describe("DELETE /users/me ", () => {
		it("Fails because you are not logged in", async () => {
			await supertest(fastify.server)
				.delete("/api/users/me")
				.expect(401)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Deletes my account", async () => {
			const user = await createDemoUser();
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});

			expect(await fastify.prisma.user.findFirst({ where: { id: user.id } })).not.toBeNull();

			await supertest(fastify.server).delete("/api/users/me").set("Cookie", cookie).expect(204);

			expect(await fastify.prisma.user.findFirst({ where: { id: user.id } })).toBeNull();
		});
	});

	describe("DELETE /users/:id ", () => {
		it("Fails because you are not logged in", async () => {
			await supertest(fastify.server)
				.delete("/api/users/1")
				.expect(401)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Fails because you don't have permissions", async () => {
			const user = await createDemoUser();
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});

			await supertest(fastify.server)
				.delete("/api/users/1")
				.set("Cookie", cookie)
				.expect(403)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Fails because user with this id doesn't exist", async () => {
			const adminUser = await createDemoAdminUser();
			const cookie = await logInAndReturnCookie({
				email: adminUser.email,
				password: DEMO_ADMIN.password,
			});

			await supertest(fastify.server)
				.delete("/api/users/1")
				.set("Cookie", cookie)
				.expect(404)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Deletes user successfully", async () => {
			const user = await createDemoUser();
			const adminUser = await createDemoAdminUser();
			const adminCookie = await logInAndReturnCookie({
				email: adminUser.email,
				password: DEMO_ADMIN.password,
			});

			expect(await fastify.prisma.user.findFirst({ where: { id: user.id } })).not.toBeNull();

			await supertest(fastify.server)
				.delete(`/api/users/${user.id}`)
				.set("Cookie", adminCookie)
				.expect(204);

			expect(await fastify.prisma.user.findFirst({ where: { id: user.id } })).toBeNull();
		});
	});

	describe("PUT /users/password ", () => {
		it("Fails because you are not logged in", async () => {
			await supertest(fastify.server)
				.put("/api/users/password")
				.expect(401)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Fails because old password doesn't match", async () => {
			const user = await createDemoUser();
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});

			await supertest(fastify.server)
				.put("/api/users/password")
				.set("Cookie", cookie)
				.send({ oldPassword: "ThatsNotCurrentPass", newPassword: "newPassword" })
				.expect(409)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Updates password successfully", async () => {
			const user = await createDemoUser();
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});
			const newPassword = "newPassword";

			expect((await fastify.prisma.user.findFirst({ where: { id: user.id } }))?.password).toEqual(
				user.password,
			);

			await supertest(fastify.server)
				.put("/api/users/password")
				.set("Cookie", cookie)
				.send({ oldPassword: DEMO_USER.password, newPassword })
				.expect(204);

			expect(
				(await fastify.prisma.user.findFirst({ where: { id: user.id } }))?.password,
			).not.toEqual(user.password);
		});
	});

	describe("PUT /users/email ", () => {
		it("Fails because you are not logged in", async () => {
			await supertest(fastify.server)
				.put("/api/users/email")
				.expect(401)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Updates email successfully", async () => {
			const user = await createDemoUser();
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});
			const newEmail = "newemail@gmail.com";

			expect((await fastify.prisma.user.findFirst({ where: { id: user.id } }))?.email).not.toEqual(
				newEmail,
			);

			await supertest(fastify.server)
				.put("/api/users/email")
				.set("Cookie", cookie)
				.send({ email: newEmail })
				.expect(204);

			expect((await fastify.prisma.user.findFirst({ where: { id: user.id } }))?.email).toEqual(
				newEmail,
			);
		});
	});
});
