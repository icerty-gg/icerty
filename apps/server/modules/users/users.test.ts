import supertest from "supertest";
import { describe, expect, it, beforeAll, afterAll, beforeEach } from "vitest";

import fastify from "../../app";

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

beforeEach(async () => {
	await fastify.prisma.user.deleteMany();
});

describe("Tests users utils", () => {
	it("Creates an user", async () => {
		const user = await createUser(fastify, DEMO_USER);

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

describe("Tests users routes routes", () => {
	it("POST /users/register", async () => {
		await supertest(fastify.server)
			.post("/api/users/register")
			.send(DEMO_USER)
			.expect(201)
			.expect("Content-Type", "application/json; charset=utf-8")
			.then((res) => {
				const body = res.body as {
					name: string;
					password: string;
					email: string;
					surname: string;
					createdAt: string;
					img: string;
					id: string;
				};

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

afterAll(async () => {
	await fastify.close();
});
