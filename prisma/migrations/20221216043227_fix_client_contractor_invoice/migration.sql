/*
  Warnings:

  - Added the required column `fk_id_contractor_client` to the `invoices_contractor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients_contractor" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "invoices_contractor" ADD COLUMN     "fk_id_contractor_client" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "invoices_contractor" ADD CONSTRAINT "invoices_contractor_fk_id_contractor_client_fkey" FOREIGN KEY ("fk_id_contractor_client") REFERENCES "clients_contractor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
