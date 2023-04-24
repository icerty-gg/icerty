// import path from "path";

// import supertest from "supertest";
// import { describe, expect, it } from "vitest";

// import fastify from "../../app";

// import { hashPassword } from "./../../utils/password";

// describe("Tests offers routes when user is logged in", () => {
// 	it("POST /offers", async () => {
// 		const hashedPassword = await hashPassword("passwordpassword");

// 		await fastify.prisma.user.create({
// 			data: {
// 				email: "jankowalski@gmail.com",
// 				name: "Jan",
// 				surname: "Kowalski",
// 				password: hashedPassword,
// 			},
// 		});

// 		const res = await supertest(fastify.server).post("/api/sessions/login").send({
// 			email: "jankowalski@gmail.com",
// 			password: "passwordpassword",
// 		});

// 		// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
// 		const token = res.header["set-cookie"][0].split(";")[0].split("=")[1] as string;

// 		const category = await fastify.prisma.category.create({
// 			data: {
// 				name: "Football",
// 				img: "football.png",
// 			},
// 		});

// 		await supertest(fastify.server)
// 			.post("/api/offers")
// 			.set("Content-Type", "multipart/form-data")
// 			.set("Cookie", [`session=${token}`])
// 			.field("categoryId", category.id)
// 			.field("count", 1)
// 			.field("name", "Football")
// 			.field(
// 				"description",
// 				"Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor",
// 			)
// 			.field("price", 100)
// 			.field("city", "Warsaw")
// 			.field("condition", "new")
// 			.attach("images", path.resolve(__dirname, "./testImage.png"))
// 			.expect(204)
// 			.then((res) => {
// 				expect(res.body).toStrictEqual({});
// 			});
// 	});

// 	it("Tests /GET offers after creating one", async () => {
// 		await supertest(fastify.server)
// 			.get("/api/offers")
// 			.expect(200)
// 			.expect("Content-Type", "application/json; charset=utf-8")
// 			.then((res) => {
// 				const body = res.body as {
// 					offers: {
// 						price: number;
// 						name: string;
// 						user: {
// 							name: string;
// 							surname: string;
// 						};
// 						description: string;
// 						condition: "new" | "used";
// 						city: string;
// 						count: number;
// 						categoryName: string;
// 					}[];
// 				};
// 				expect(body.offers.length).toEqual(1);
// 				expect(body.offers[0]?.name).toEqual("Football");
// 				expect(body.offers[0]?.city).toEqual("Warsaw");
// 				expect(body.offers[0]?.condition).toEqual("new");
// 				expect(body.offers[0]?.description).toEqual(
// 					"Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor",
// 				);
// 				expect(body.offers[0]?.price).toEqual(100);
// 				expect(body.offers[0]?.count).toEqual(1);
// 				expect(body.offers[0]?.user.name).toEqual("Jan");
// 				expect(body.offers[0]?.user.surname).toEqual("Kowalski");
// 				expect(body.offers[0]?.categoryName).toEqual("Football");
// 			});
// 	});
// });
