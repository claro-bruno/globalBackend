/*
  Warnings:

  - The values [GLOBAL] on the enum `Access` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Access_new" AS ENUM ('CONTRACTOR', 'CLIENT', 'OFFICE', 'ADMIN');
ALTER TABLE "accounts" ALTER COLUMN "access" TYPE "Access_new" USING ("access"::text::"Access_new");
ALTER TYPE "Access" RENAME TO "Access_old";
ALTER TYPE "Access_new" RENAME TO "Access";
DROP TYPE "Access_old";
COMMIT;

-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "payed_for" TEXT;

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "notes" TEXT,
    "fk_id_client" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" SERIAL NOT NULL,
    "date_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" DOUBLE PRECISION NOT NULL,
    "payed_for" TEXT,
    "identification" TEXT NOT NULL,
    "description" TEXT,
    "month" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "fk_id_client" INTEGER,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk_id_client_fkey" FOREIGN KEY ("fk_id_client") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_fk_id_client_fkey" FOREIGN KEY ("fk_id_client") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
