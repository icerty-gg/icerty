-- AlterTable
ALTER TABLE "offerImage" ADD COLUMN     "followedOffersId" TEXT;

-- AddForeignKey
ALTER TABLE "offerImage" ADD CONSTRAINT "offerImage_followedOffersId_fkey" FOREIGN KEY ("followedOffersId") REFERENCES "followedOffers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
