-- DropForeignKey
ALTER TABLE "FollowedOffers" DROP CONSTRAINT "FollowedOffers_userId_fkey";

-- AddForeignKey
ALTER TABLE "FollowedOffers" ADD CONSTRAINT "FollowedOffers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
