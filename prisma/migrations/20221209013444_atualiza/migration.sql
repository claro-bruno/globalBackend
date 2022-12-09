/*
  Warnings:

  - You are about to drop the column `clientsContractorsId` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `fk_id_contractor` on the `clients_Contractors` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fk_id_client_contractor]` on the table `contractors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identification` to the `clients_Contractors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_clientsContractorsId_fkey";

-- DropForeignKey
ALTER TABLE "clients_Contractors" DROP CONSTRAINT "clients_Contractors_fk_id_contractor_fkey";

-- DropIndex
DROP INDEX "clients_Contractors_fk_id_contractor_key";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "clientsContractorsId";

-- AlterTable
ALTER TABLE "clients_Contractors" DROP COLUMN "fk_id_contractor",
ADD COLUMN     "identification" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "contractors" ADD COLUMN     "fk_id_client_contractor" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "contractors_fk_id_client_contractor_key" ON "contractors"("fk_id_client_contractor");

-- AddForeignKey
ALTER TABLE "contractors" ADD CONSTRAINT "contractors_fk_id_client_contractor_fkey" FOREIGN KEY ("fk_id_client_contractor") REFERENCES "clients_Contractors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
