-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "clientsContractorsId" INTEGER;

-- CreateTable
CREATE TABLE "clients_Contractors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_id_contractor" INTEGER,
    "contact" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "email" TEXT,

    CONSTRAINT "clients_Contractors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices_contractor" (
    "id" SERIAL NOT NULL,
    "fk_id_payment" INTEGER NOT NULL,
    "fk_id_contractor" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invoices_contractor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_Contractors_fk_id_contractor_key" ON "clients_Contractors"("fk_id_contractor");

-- AddForeignKey
ALTER TABLE "clients_Contractors" ADD CONSTRAINT "clients_Contractors_fk_id_contractor_fkey" FOREIGN KEY ("fk_id_contractor") REFERENCES "contractors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices_contractor" ADD CONSTRAINT "invoices_contractor_fk_id_payment_fkey" FOREIGN KEY ("fk_id_payment") REFERENCES "payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices_contractor" ADD CONSTRAINT "invoices_contractor_fk_id_contractor_fkey" FOREIGN KEY ("fk_id_contractor") REFERENCES "contractors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_clientsContractorsId_fkey" FOREIGN KEY ("clientsContractorsId") REFERENCES "clients_Contractors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
