/*
  Warnings:

  - A unique constraint covering the columns `[pay_id]` on the table `payments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "payments_pay_id_key" ON "payments"("pay_id");
