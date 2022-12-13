/*
  Warnings:

  - You are about to drop the `clients_Contractors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "contractors" DROP CONSTRAINT "contractors_fk_id_client_contractor_fkey";

-- DropTable
DROP TABLE "clients_Contractors";

-- CreateTable
CREATE TABLE "clients_contractor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "identification" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,

    CONSTRAINT "clients_contractor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contractors" ADD CONSTRAINT "contractors_fk_id_client_contractor_fkey" FOREIGN KEY ("fk_id_client_contractor") REFERENCES "clients_contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
