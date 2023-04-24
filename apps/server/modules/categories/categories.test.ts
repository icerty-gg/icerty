// import supertest from "supertest";
// import { describe, expect, it } from "vitest";

// import fastify from "../../app";

// describe("Tests categories routes", () => {
// 	it("GET /categories", async () => {
// 		await supertest(fastify.server)
// 			.get("/api/categories")
// 			.expect(200)
// 			.expect("Content-Type", "application/json; charset=utf-8")
// 			.then((res) => {
// 				const body = res.body as { categories: { name: string; img: string }[] };

// 				expect(body.categories.length).toEqual(3);
// 				expect(body.categories[0]?.name).toEqual("Football");
// 				expect(body.categories[0]?.img).toEqual("football.png");
// 			});
// 	});
// });
