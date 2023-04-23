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

export const logInAndReturnCookie = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const res = await supertest(fastify.server).post("/api/sessions/login").send({ email, password });

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
	const cookie = [...res.header["set-cookie"]];

	return cookie as string[];
};

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

		it("POST /sessions/login logs in successfully then logs in again and errors because you're already logged in", async () => {
			const user = await createUser(DEMO_USER);

			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});

			await supertest(fastify.server)
				.post("/api/sessions/login")
				.set("Cookie", cookie)
				.send({ email: user.email, password: DEMO_USER.password })
				.expect(403)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("POST /sessions/login successfully logs in and sets cookie", async () => {
			const user = await createUser(DEMO_USER);

			await supertest(fastify.server)
				.post("/api/sessions/login")
				.send({ email: user.email, password: DEMO_USER.password })
				.expect(201)
				.expect("Content-Type", "application/json; charset=utf-8")
				.then((res) => {
					const returnedUser = { ...user, createdAt: user.createdAt.toISOString() };
					expect(res.body).toEqual(returnedUser);
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					expect(res.header["set-cookie"]).toEqual([expect.any(String)]);
				});
		});
	});

	describe("Tests logout route", () => {
		it("POST /sessions/logout and get an error because you are not logged in", async () => {
			await supertest(fastify.server)
				.post("/api/sessions/logout")
				.expect(401)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("POST /sessions/logout and logs out", async () => {
			const user = await createUser(DEMO_USER);
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});

			await supertest(fastify.server)
				.post("/api/sessions/logout")
				.expect(204)
				.set("Cookie", cookie);

			await supertest(fastify.server)
				.get("/api/sessions/me")
				.expect(401)
				.expect("Content-Type", "application/json; charset=utf-8");
		});
	});

	describe("Tests get me route", () => {
		it("GET /sessions/me and throws because you are not logged in", async () => {
			await supertest(fastify.server)
				.get("/api/sessions/me")
				.expect(401)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("GET /sessions/me and returns current user", async () => {
			const user = await createUser(DEMO_USER);
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});

			await supertest(fastify.server)
				.get("/api/sessions/me")
				.set("Cookie", cookie)
				.expect(200)
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
