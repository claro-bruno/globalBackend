/*
  Warnings:

  - You are about to drop the column `contact` on the `clients_Contractors` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `clients_Contractors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clients_Contractors" DROP COLUMN "contact",
DROP COLUMN "email";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "type" TEXT;
