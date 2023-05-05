import path from "path";

import { Static } from "@fastify/type-provider-typebox";
import supertest from "supertest";
import { describe, expect, it } from "vitest";

import fastify from "../../app";
import { hashPassword } from "../../utils/password";

import {
	DEMO_ADMIN,
	DEMO_OFFER,
	DEMO_USER,
	createDemoAdminUser,
	createDemoCategory,
	createDemoOffer,
	createDemoUser,
	logInAndReturnCookie,
} from "./../../__tests__/utils";
import { getOfferSchema } from "./offers.schemas";

describe("Tests offers routes", () => {
	describe("GET /offers", () => {
		it("Returns empty array of offers", async () => {
			await supertest(fastify.server)
				.get("/api/offers")
				.expect(200)
				.expect("Content-Type", "application/json; charset=utf-8")
				.then((res) => {
					expect(res.body).toEqual({
						maxPage: 1,
						offers: [],
						count: 0,
					});
				});
		});
	});

	describe("GET /offers/:id", () => {
		it("Fails because offer is not found", async () => {
			await supertest(fastify.server)
				.get("/api/offers/1")
				.expect(404)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Returns an offer", async () => {
			const { offer, category, user } = await createDemoOffer();

			await supertest(fastify.server)
				.get(`/api/offers/${offer.id}`)
				.expect(200)
				.expect("Content-Type", "application/json; charset=utf-8")
				.then((res) => {
					type TBody = Static<(typeof getOfferSchema)["response"]["200"]>;
					const body = res.body as TBody;

					expect(body.city).toEqual(offer.city);
					expect(body.condition).toEqual(offer.condition);
					expect(body.count).toEqual(offer.count);
					expect(body.createdAt).toEqual(offer.createdAt.toISOString());
					expect(body.description).toEqual(offer.description);
					expect(body.id).toEqual(offer.id);
					expect(body.isPromoted).toEqual(offer.isPromoted);
					expect(body.name).toEqual(offer.name);
					expect(body.price).toEqual(offer.price);
					expect(body.updatedAt).toEqual(offer.updatedAt.toISOString());
					expect(body.category.name).toEqual(category.name);
					expect(body.category.img).toEqual(category.img);
					expect(body.user.name).toEqual(user.name);
					expect(body.user.email).toEqual(user.email);
					expect(body.user.createdAt).toEqual(user.createdAt.toISOString());
					expect(body.user.img).toEqual(user.img);
					expect(body.user.surname).toEqual(user.surname);
					expect(body.images).toEqual([]);
				});
		});
	});

	describe("POST /offers", () => {
		it("Fails because you are not logged in", async () => {
			await supertest(fastify.server)
				.post("/api/offers")
				.expect(401)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Fails to create an offer because categoryId is wrong", async () => {
			const user = await createDemoUser();
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});

			await supertest(fastify.server)
				.post("/api/offers")
				.set("Cookie", cookie)
				.attach("images", path.resolve(__dirname, "../../__tests__/testImage.png"))
				.field("name", DEMO_OFFER.name)
				.field("description", DEMO_OFFER.description)
				.field("count", DEMO_OFFER.count)
				.field("price", DEMO_OFFER.price)
				.field("condition", DEMO_OFFER.condition)
				.field("city", DEMO_OFFER.city)
				.field("categoryId", 1)
				.expect(404)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Fails to create an offer because file type is invalid", async () => {
			const user = await createDemoUser();
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});

			const category = await createDemoCategory();

			await supertest(fastify.server)
				.post("/api/offers")
				.set("Cookie", cookie)
				.attach("images", path.resolve(__dirname, "../../__tests__/testFile.pdf"))
				.field("name", DEMO_OFFER.name)
				.field("description", DEMO_OFFER.description)
				.field("count", DEMO_OFFER.count)
				.field("price", DEMO_OFFER.price)
				.field("categoryId", category.id)
				.field("condition", DEMO_OFFER.condition)
				.field("city", DEMO_OFFER.city)
				.expect(400);
		});

		it("Creates an offer successfully", async () => {
			const user = await createDemoUser();
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});

			const category = await createDemoCategory();

			expect(await fastify.prisma.offer.count()).toEqual(0);

			await supertest(fastify.server)
				.post("/api/offers")
				.set("Cookie", cookie)
				.attach("images", path.resolve(__dirname, "../../__tests__/testImage.png"))
				.field("name", DEMO_OFFER.name)
				.field("description", DEMO_OFFER.description)
				.field("count", DEMO_OFFER.count)
				.field("price", DEMO_OFFER.price)
				.field("categoryId", category.id)
				.field("condition", DEMO_OFFER.condition)
				.field("city", DEMO_OFFER.city)
				.expect(204);

			expect(await fastify.prisma.offer.count()).toEqual(1);
			expect((await fastify.prisma.offer.findFirst())?.name).toEqual(DEMO_OFFER.name);
			expect((await fastify.prisma.offer.findFirst())?.description).toEqual(DEMO_OFFER.description);
			expect((await fastify.prisma.offer.findFirst())?.count).toEqual(DEMO_OFFER.count);
			expect((await fastify.prisma.offer.findFirst())?.price).toEqual(DEMO_OFFER.price);
			expect((await fastify.prisma.offer.findFirst())?.condition).toEqual(DEMO_OFFER.condition);
			expect((await fastify.prisma.offer.findFirst())?.city).toEqual(DEMO_OFFER.city);
		});
	});

	describe("DELETE /offers/:id", () => {
		it("Fails to delete an offer because user is not logged in", async () => {
			await supertest(fastify.server)
				.delete("/api/offers/1")
				.expect(401)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Fails because offer is not found", async () => {
			const adminUser = await createDemoAdminUser();
			const cookie = await logInAndReturnCookie({
				email: adminUser.email,
				password: DEMO_ADMIN.password,
			});

			await supertest(fastify.server)
				.delete("/api/offers/1")
				.set("Cookie", cookie)
				.expect(404)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Fails because user wants to delete not his offer", async () => {
			const { offer } = await createDemoOffer();

			const fakeUserPass = "fakeuserpassword123";
			const fakeUser = await fastify.prisma.user.create({
				data: {
					email: "fakeuser@gmail.com",
					name: "fake",
					surname: "user",
					password: await hashPassword(fakeUserPass),
					role: "user",
				},
			});

			const cookie = await logInAndReturnCookie({
				email: fakeUser.email,
				password: fakeUserPass,
			});

			await supertest(fastify.server)
				.delete(`/api/offers/${offer.id}`)
				.set("Cookie", cookie)
				.expect(403)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Deletes an offer successfully as admin", async () => {
			const { offer } = await createDemoOffer();
			const adminUser = await createDemoAdminUser();
			const cookie = await logInAndReturnCookie({
				email: adminUser.email,
				password: DEMO_ADMIN.password,
			});

			await supertest(fastify.server)
				.delete(`/api/offers/${offer.id}`)
				.set("Cookie", cookie)
				.expect(204);
		});

		it("Deletes own offer", async () => {
			const { offer, user } = await createDemoOffer();
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});

			await supertest(fastify.server)
				.delete(`/api/offers/${offer.id}`)
				.set("Cookie", cookie)
				.expect(204);
		});
	});

	describe("PUT /offers/:id", () => {
		it("Fails because user is not logged in", async () => {
			await supertest(fastify.server)
				.put("/api/offers/1")
				.expect(401)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Fails because offer was not found", async () => {
			const user = await createDemoUser();
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});

			await supertest(fastify.server)
				.put("/api/offers/1")
				.set("Cookie", cookie)
				.send({
					name: "new offer name",
				})
				.expect(404)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Fails because user is not an author of this offer", async () => {
			const adminUser = await createDemoAdminUser();
			const cookie = await logInAndReturnCookie({
				email: adminUser.email,
				password: DEMO_ADMIN.password,
			});
			const { offer } = await createDemoOffer();
			await supertest(fastify.server)
				.put(`/api/offers/${offer.id}`)
				.set("Cookie", cookie)
				.send({
					name: "new offer name",
				})
				.expect(404)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Updates an offer", async () => {
			const { offer } = await createDemoOffer();
			const cookie = await logInAndReturnCookie({
				email: DEMO_USER.email,
				password: DEMO_USER.password,
			});

			const newName = "new offer name";
			const newDescription =
				"lorem loerm lor ipsum dolor sit amet lorem loerm lor ipsum dolor sit ametorem loerm lor ipsum dolor sit amet lorem loerm lor ipsum dolor sit amet ";
			const newCount = 2;
			const newPrice = 200;
			const newCondition = "used";
			const newCity = "Cracow";
			const newIsPromoted = true;

			const newCategoryId = await createDemoCategory("new fake category").then((c) => c.id);

			expect(offer.name).not.toEqual(newName);
			expect(offer.description).not.toEqual(newDescription);
			expect(offer.count).not.toEqual(newCount);
			expect(offer.price).not.toEqual(newPrice);
			expect(offer.condition).not.toEqual(newCondition);
			expect(offer.city).not.toEqual(newCity);
			expect(offer.isPromoted).not.toEqual(newIsPromoted);
			expect(offer.categoryId).not.toEqual(newCategoryId);

			await supertest(fastify.server)
				.put(`/api/offers/${offer.id}`)
				.set("Cookie", cookie)
				.send({
					name: newName,
					description: newDescription,
					count: newCount,
					price: newPrice,
					condition: newCondition,
					city: newCity,
					isPromoted: newIsPromoted,
					categoryId: newCategoryId,
				})
				.expect(204);

			const updatedOffer = await fastify.prisma.offer.findFirst({
				where: {
					id: offer.id,
				},
			});

			expect(updatedOffer?.name).toEqual(newName);
			expect(updatedOffer?.description).toEqual(newDescription);
			expect(updatedOffer?.count).toEqual(newCount);
			expect(updatedOffer?.price).toEqual(newPrice);
			expect(updatedOffer?.condition).toEqual(newCondition);
			expect(updatedOffer?.city).toEqual(newCity);
			expect(updatedOffer?.isPromoted).toEqual(newIsPromoted);
			expect(updatedOffer?.categoryId).toEqual(newCategoryId);
		});
	});

	describe("POST /offers/follow:id", () => {
		it("Fails because user is not logged in", async () => {
			await supertest(fastify.server)
				.post("/api/offers/follow/1")
				.expect(401)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Fails because offer was not found", async () => {
			const user = await createDemoUser();
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});

			await supertest(fastify.server)
				.post("/api/offers/follow/1")
				.set("Cookie", cookie)
				.expect(404)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Fails because user follows this offer already ", async () => {
			const { offer } = await createDemoOffer();
			const cookie = await logInAndReturnCookie({
				email: DEMO_USER.email,
				password: DEMO_USER.password,
			});

			await fastify.prisma.followedOffers.create({
				data: { offerId: offer.id, userId: offer.userId },
			});

			await supertest(fastify.server)
				.post(`/api/offers/follow/${offer.id}`)
				.set("Cookie", cookie)
				.expect(400)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Follows an offer", async () => {
			const { offer } = await createDemoOffer();
			const cookie = await logInAndReturnCookie({
				email: DEMO_USER.email,
				password: DEMO_USER.password,
			});

			expect(await fastify.prisma.followedOffers.count()).toEqual(0);

			await supertest(fastify.server)
				.post(`/api/offers/follow/${offer.id}`)
				.set("Cookie", cookie)
				.expect(204);

			expect(await fastify.prisma.followedOffers.count()).toEqual(1);
		});
	});

	describe("DELETE /offers/follow:id", () => {
		it("Fails because user is not logged in", async () => {
			await supertest(fastify.server)
				.delete("/api/offers/follow/1")
				.expect(401)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Fails because offer was not found", async () => {
			const user = await createDemoUser();
			const cookie = await logInAndReturnCookie({
				email: user.email,
				password: DEMO_USER.password,
			});

			await supertest(fastify.server)
				.delete("/api/offers/follow/1")
				.set("Cookie", cookie)
				.expect(404)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Fails because user doesn't follow this offer", async () => {
			const { offer } = await createDemoOffer();
			const cookie = await logInAndReturnCookie({
				email: DEMO_USER.email,
				password: DEMO_USER.password,
			});

			await supertest(fastify.server)
				.delete(`/api/offers/follow/${offer.id}`)
				.set("Cookie", cookie)
				.expect(404)
				.expect("Content-Type", "application/json; charset=utf-8");
		});

		it("Unfollows an offer", async () => {
			const { offer } = await createDemoOffer();
			const cookie = await logInAndReturnCookie({
				email: DEMO_USER.email,
				password: DEMO_USER.password,
			});

			await fastify.prisma.followedOffers.create({
				data: { offerId: offer.id, userId: offer.userId },
			});

			expect(await fastify.prisma.followedOffers.count()).toEqual(1);

			await supertest(fastify.server)
				.delete(`/api/offers/follow/${offer.id}`)
				.set("Cookie", cookie)
				.expect(204);

			expect(await fastify.prisma.followedOffers.count()).toEqual(0);
		});
	});
});
