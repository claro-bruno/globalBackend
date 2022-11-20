/*
  Warnings:

  - You are about to drop the column `pay_des_for` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `shirts` on the `quarters` table. All the data in the column will be lost.
  - You are about to drop the column `taxes` on the `quarters` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "payments" DROP COLUMN "pay_des_for",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "others" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "quarters" DROP COLUMN "shirts",
DROP COLUMN "taxes",
ADD COLUMN     "others" DOUBLE PRECISION NOT NULL DEFAULT 0;
