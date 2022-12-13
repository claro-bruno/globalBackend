/*
  Warnings:

  - You are about to drop the column `invoicesId` on the `orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_invoicesId_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "invoicesId",
ADD COLUMN     "fk_invoice_id" INTEGER;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk_invoice_id_fkey" FOREIGN KEY ("fk_invoice_id") REFERENCES "invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
