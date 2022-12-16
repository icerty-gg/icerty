-- CreateTable
CREATE TABLE "offerImage" (
    "id" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "offerImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "offerImage" ADD CONSTRAINT "offerImage_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
