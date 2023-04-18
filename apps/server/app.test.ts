import supertest from "supertest";
import { describe, expect, it } from "vitest";

import fastify from "./app";

describe("GET `/` route", () => {
	it("should return 200", async () => {
		await fastify.ready();

		await supertest(fastify.server)
			.get("/")
			.expect(200)
			.expect("Content-Type", "text/plain; charset=utf-8")
			.then((res) => expect(res.text).toEqual("Hello from api!"));
	});
});
