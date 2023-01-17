/*
  Warnings:

  - The values [ADMIN,USER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `city` to the `offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `condition` to the `offer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('new', 'used');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('admin', 'user');
ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user';
COMMIT;

-- AlterTable
ALTER TABLE "offer" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "condition" "Condition" NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user';
