/*
  Warnings:

  - You are about to drop the column `fk_invoice_id` on the `orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_fk_invoice_id_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "fk_invoice_id",
ADD COLUMN     "invoicesId" INTEGER,
ADD COLUMN     "isInvoice" BOOLEAN DEFAULT false;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_invoicesId_fkey" FOREIGN KEY ("invoicesId") REFERENCES "invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
