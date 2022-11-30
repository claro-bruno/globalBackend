/*
  Warnings:

  - The values [OK,UNKNOWN] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "Method" ADD VALUE 'CARD';

-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('REVISED', 'ACTIVE', 'RECEIPT', 'NORECEIPT', 'INACTIVE', 'PENDING');
ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "clients" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "jobs" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "accounts" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "contractors" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "quarters" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "payments" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "contractors" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "clients" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "accounts" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "jobs" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "quarters" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'PENDING';
ALTER TABLE "clients" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
ALTER TABLE "jobs" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
ALTER TABLE "accounts" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
ALTER TABLE "contractors" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
ALTER TABLE "quarters" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "fk_support_id" INTEGER;

-- CreateTable
CREATE TABLE "ordesContractors" (
    "id" SERIAL NOT NULL,
    "fk_id_order" INTEGER NOT NULL,
    "fk_id_contractor" INTEGER NOT NULL,
    "start_hour" TEXT NOT NULL,
    "end_hour" TEXT NOT NULL,

    CONSTRAINT "ordesContractors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk_support_id_fkey" FOREIGN KEY ("fk_support_id") REFERENCES "contractors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordesContractors" ADD CONSTRAINT "ordesContractors_fk_id_order_fkey" FOREIGN KEY ("fk_id_order") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordesContractors" ADD CONSTRAINT "ordesContractors_fk_id_contractor_fkey" FOREIGN KEY ("fk_id_contractor") REFERENCES "contractors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
