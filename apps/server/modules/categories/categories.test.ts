import supertest from "supertest";
import { describe, expect, it } from "vitest";

import fastify from "../../app";

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
	});
});
