import supertest from "supertest";
import { expect, it } from "vitest";

import fastify from "./app";

it("Tests if server is running correctly", async () => {
	await supertest(fastify.server)
		.get("/")
		.expect(200)
		.expect("Content-Type", "text/plain; charset=utf-8")
		.then((res) => expect(res.text).toEqual("Hello from api!"));
});
