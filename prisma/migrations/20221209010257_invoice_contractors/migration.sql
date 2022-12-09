/*
  Warnings:

  - Added the required column `quarter` to the `invoices_contractor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoices_contractor" ADD COLUMN     "quarter" INTEGER NOT NULL;
