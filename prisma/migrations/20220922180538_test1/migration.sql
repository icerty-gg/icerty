/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryName` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_categoryId_fkey";

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "categoryName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "category_id_name_key" ON "category"("id", "name");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_categoryId_categoryName_fkey" FOREIGN KEY ("categoryId", "categoryName") REFERENCES "category"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;
