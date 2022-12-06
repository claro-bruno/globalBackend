-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "fk_invoice_id" INTEGER;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk_invoice_id_fkey" FOREIGN KEY ("fk_invoice_id") REFERENCES "invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
