-- DropIndex
DROP INDEX "offer_name_key";

-- CreateTable
CREATE TABLE "followedOffers" (
    "id" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "followedOffers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "followedOffers" ADD CONSTRAINT "followedOffers_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "followedOffers" ADD CONSTRAINT "followedOffers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
