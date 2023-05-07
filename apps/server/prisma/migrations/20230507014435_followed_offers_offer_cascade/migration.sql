-- DropForeignKey
ALTER TABLE "FollowedOffers" DROP CONSTRAINT "FollowedOffers_offerId_fkey";

-- AddForeignKey
ALTER TABLE "FollowedOffers" ADD CONSTRAINT "FollowedOffers_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
