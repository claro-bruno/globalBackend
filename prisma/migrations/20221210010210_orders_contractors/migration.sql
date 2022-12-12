/*
  Warnings:

  - You are about to drop the `ordesContractors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ordesContractors" DROP CONSTRAINT "ordesContractors_fk_id_contractor_fkey";

-- DropForeignKey
ALTER TABLE "ordesContractors" DROP CONSTRAINT "ordesContractors_fk_id_order_fkey";

-- DropTable
DROP TABLE "ordesContractors";

-- CreateTable
CREATE TABLE "ordersContractors" (
    "id" SERIAL NOT NULL,
    "fk_id_order" INTEGER NOT NULL,
    "fk_id_contractor" INTEGER NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "total" DOUBLE PRECISION,

    CONSTRAINT "ordersContractors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ordersContractors" ADD CONSTRAINT "ordersContractors_fk_id_order_fkey" FOREIGN KEY ("fk_id_order") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordersContractors" ADD CONSTRAINT "ordersContractors_fk_id_contractor_fkey" FOREIGN KEY ("fk_id_contractor") REFERENCES "contractors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
