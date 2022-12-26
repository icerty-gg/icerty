/*
  Warnings:

  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `followedOffers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `offer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `offerImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "role" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "condition" AS ENUM ('new', 'used');

-- DropForeignKey
ALTER TABLE "followedOffers" DROP CONSTRAINT "followedOffers_offerId_fkey";

-- DropForeignKey
ALTER TABLE "followedOffers" DROP CONSTRAINT "followedOffers_userId_fkey";

-- DropForeignKey
ALTER TABLE "offer" DROP CONSTRAINT "offer_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "offer" DROP CONSTRAINT "offer_userId_fkey";

-- DropForeignKey
ALTER TABLE "offerImage" DROP CONSTRAINT "offerImage_offerId_fkey";

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "followedOffers";

-- DropTable
DROP TABLE "offer";

-- DropTable
DROP TABLE "offerImage";

-- DropTable
DROP TABLE "user";

-- DropEnum
DROP TYPE "Condition";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "img" TEXT NOT NULL DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
    "role" "role" NOT NULL DEFAULT 'user',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isPromoted" BOOLEAN NOT NULL DEFAULT false,
    "city" TEXT NOT NULL,
    "condition" "condition" NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferImage" (
    "id" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "OfferImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FollowedOffers" (
    "id" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FollowedOffers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_img_key" ON "Category"("name", "img");

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferImage" ADD CONSTRAINT "OfferImage_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowedOffers" ADD CONSTRAINT "FollowedOffers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowedOffers" ADD CONSTRAINT "FollowedOffers_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
