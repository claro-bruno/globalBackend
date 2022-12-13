/*
  Warnings:

  - You are about to drop the column `end_hour` on the `ordersContractors` table. All the data in the column will be lost.
  - You are about to drop the column `start_hour` on the `ordersContractors` table. All the data in the column will be lost.
  - Added the required column `end` to the `ordersContractors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `ordersContractors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ordersContractors" DROP COLUMN "end_hour",
DROP COLUMN "start_hour",
ADD COLUMN     "end" TEXT NOT NULL,
ADD COLUMN     "start" TEXT NOT NULL;
