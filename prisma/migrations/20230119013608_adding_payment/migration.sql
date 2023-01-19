-- CreateTable
CREATE TABLE "paymentsContractors" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "others" DOUBLE PRECISION,
    "method" "Method",
    "year" INTEGER NOT NULL,
    "month" TEXT NOT NULL,
    "date_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "Type" NOT NULL,
    "description" TEXT,
    "quarter" INTEGER,
    "identification" TEXT DEFAULT '',
    "fk_id_contractor" INTEGER,
    "status" "Status",

    CONSTRAINT "paymentsContractors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "paymentsContractors" ADD CONSTRAINT "paymentsContractors_fk_id_contractor_fkey" FOREIGN KEY ("fk_id_contractor") REFERENCES "contractors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
