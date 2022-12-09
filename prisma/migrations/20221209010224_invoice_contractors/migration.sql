/*
  Warnings:

  - Added the required column `month` to the `invoices_contractor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `invoices_contractor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoices_contractor" ADD COLUMN     "month" TEXT NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
