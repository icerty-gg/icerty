import supertest from "supertest";
import { describe, expect, it, beforeAll, afterAll, afterEach } from "vitest";

import fastify from "../../app";
import { DEMO_USER } from "../users/users.test";
import { createUser } from "../users/users.utils";

beforeAll(async () => {
	await fastify.ready();
});

afterEach(async () => {
	await fastify.prisma.user.deleteMany();
});

describe("Tests sessions routes routes", () => {
	describe("Tests login route", () => {
		it("POST /sessions/login and failes because there is no such a user created", async () => {
			await supertest(fastify.server)
				.post("/api/sessions/login")
				.send({ email: DEMO_USER.email, password: DEMO_USER.password })
				.expect(404)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("POST /sessions/login and failes because there is wrong password provided", async () => {
			const user = await createUser(DEMO_USER);

			await supertest(fastify.server)
				.post("/api/sessions/login")
				.send({ email: user.email, password: "Wrong password" })
				.expect(404)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("POST /sessions/login and failes because there is wrong email provided", async () => {
			await createUser(DEMO_USER);

			await supertest(fastify.server)
				.post("/api/sessions/login")
				.send({ email: "Wrong.email@gmail.com", password: DEMO_USER.password })
				.expect(404)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("POST /sessions/login and successfully logs in", async () => {
			const user = await createUser(DEMO_USER);

			await supertest(fastify.server)
				.post("/api/sessions/login")
				.send({ email: user.email, password: DEMO_USER.password })
				.expect(201)
				.expect("Content-Type", "application/json; charset=utf-8")
				.then((res) => {
					const returnedUser = { ...user, createdAt: user.createdAt.toISOString() };
					expect(res.body).toEqual(returnedUser);
				});
		});
	});
});

afterAll(async () => {
	await fastify.close();
});
