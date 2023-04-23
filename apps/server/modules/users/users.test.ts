import supertest from "supertest";
import { describe, expect, it, beforeAll, afterAll, afterEach } from "vitest";

import fastify from "../../app";
import { logInAndReturnCookie } from "../sessions/sessions.test";

import { User } from "./users.schemas";
import { createUser } from "./users.utils";

export const DEMO_USER = {
	email: "jankowalski@gmail.com",
	name: "Jan",
	surname: "Kowalski",
	password: "passwordpassword",
};

beforeAll(async () => {
	await fastify.ready();
});

afterEach(async () => {
	await fastify.prisma.user.deleteMany();
});

describe("Tests users utils", () => {
	it("Creates an user", async () => {
		const user = await createUser(DEMO_USER);

		expect(user.name).toBe(DEMO_USER.name);
		expect(user.surname).toBe(DEMO_USER.surname);
		expect(user.email).toBe(DEMO_USER.email);
		expect(user.password).not.toBe(DEMO_USER.password);
		expect(user.password).toEqual(expect.any(String));
		expect(user.createdAt).toEqual(expect.any(Date));
		expect(user.img).toEqual(expect.any(String));
		expect(user.id).toEqual(expect.any(String));
	});
});

describe("Tests users routes", () => {
	describe("POST /users/register ", () => {
		it("Fails because email is taken", async () => {
			await supertest(fastify.server).post("/api/users/register").send(DEMO_USER);

			await supertest(fastify.server)
				.post("/api/users/register")
				.send(DEMO_USER)
				.expect(409)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Registers successfully", async () => {
			await supertest(fastify.server)
				.post("/api/users/register")
				.send(DEMO_USER)
				.expect(201)
				.expect("Content-Type", "application/json; charset=utf-8")
				.then((res) => {
					const body = res.body as User;

					expect(body.name).toBe(DEMO_USER.name);
					expect(body.surname).toBe(DEMO_USER.surname);
					expect(body.email).toBe(DEMO_USER.email);
					expect(body.password).not.toBe(DEMO_USER.password);
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
			const user = await createUser(DEMO_USER);
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});
			await supertest(fastify.server).delete("/api/users/me").set("Cookie", cookie).expect(204);
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
			const user = await createUser(DEMO_USER);
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
			const user = await createUser({ ...DEMO_USER, role: "admin" });
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});
			await supertest(fastify.server)
				.delete("/api/users/1")
				.set("Cookie", cookie)
				.expect(404)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Deletes user successfully", async () => {
			const userToBeDeleted = await createUser(DEMO_USER);
			const user = await createUser({ ...DEMO_USER, role: "admin", email: "admin@gmail.com" });
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});
			await supertest(fastify.server)
				.delete(`/api/users/${userToBeDeleted.id}`)
				.set("Cookie", cookie)
				.expect(204);
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
			const user = await createUser(DEMO_USER);
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
			const user = await createUser(DEMO_USER);
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});
			const newPassword = "newPassword";
			await supertest(fastify.server)
				.put("/api/users/password")
				.set("Cookie", cookie)
				.send({ oldPassword: DEMO_USER.password, newPassword })
				.expect(204);

			await supertest(fastify.server)
				.post("/api/sessions/login")
				.send({ email: user.email, password: newPassword })
				.expect(201)
				.expect("Content-Type", "application/json; charset=utf-8");
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
			const user = await createUser(DEMO_USER);
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});
			const newEmail = "newemail@gmail.com";

			await supertest(fastify.server)
				.put("/api/users/email")
				.set("Cookie", cookie)
				.send({ email: newEmail })
				.expect(204);

			await supertest(fastify.server)
				.post("/api/sessions/login")
				.send({ email: newEmail, password: DEMO_USER.password })
				.expect(201)
				.expect("Content-Type", "application/json; charset=utf-8");
		});
	});
});

afterAll(async () => {
	await fastify.close();
});
