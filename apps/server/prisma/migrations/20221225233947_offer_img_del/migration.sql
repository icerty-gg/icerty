/*
  Warnings:

  - You are about to drop the column `followedOffersId` on the `offerImage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "offerImage" DROP CONSTRAINT "offerImage_followedOffersId_fkey";

-- AlterTable
ALTER TABLE "offerImage" DROP COLUMN "followedOffersId";
