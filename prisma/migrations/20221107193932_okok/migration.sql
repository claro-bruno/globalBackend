-- CreateEnum
CREATE TYPE "Access" AS ENUM ('CONTRACTOR', 'CLIENT', 'GLOBAL', 'ADMIN');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CONTRACTOR', 'CLIENT');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('REVISED', 'ACTIVE', 'OK', 'INACTIVE', 'PENDING');

-- CreateEnum
CREATE TYPE "Method" AS ENUM ('CHECK', 'TRANSFER', 'RECEIPT', 'VENMO');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('INPUT', 'LABOUR_PAYROOL', 'VAN_FUEL_OIL', 'FUEL_OIL', 'EQUIPMENT', 'ADVERTISEMENT', 'UNIFORM', 'REPAIRS_MAINTENANCE', 'OFFICE_EXPENSES', 'MEALS', 'CONTRACTOR', 'CONTRACTOR_WORKERS', 'CHEMICAL_CONSUMABLES', 'INSURANCE_TAX', 'EXTRAS', 'GLOBAL');

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "method" "Method" NOT NULL,
    "year" INTEGER NOT NULL,
    "month" TEXT NOT NULL,
    "date_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "Type" NOT NULL,
    "pay_des_for" TEXT,
    "quarter" INTEGER,
    "identification" TEXT NOT NULL DEFAULT '',
    "fk_id_contractor" INTEGER,
    "fk_id_client" INTEGER,
    "status" "Status",

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "balances" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "month" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "balances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractors" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "urlProfile" TEXT,
    "urlDocumentProof" TEXT,
    "urlPrimaryResidencyProof" TEXT,
    "urlSecondaryResidencyProof" TEXT,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "ein" TEXT,
    "acceptTerms" BOOLEAN NOT NULL,
    "identification" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "telephone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_id_account" INTEGER,

    CONSTRAINT "contractors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_id_account" INTEGER,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "monday" BOOLEAN NOT NULL,
    "tuesday" BOOLEAN NOT NULL,
    "wednesday" BOOLEAN NOT NULL,
    "thursday" BOOLEAN NOT NULL,
    "friday" BOOLEAN NOT NULL,
    "saturday" BOOLEAN NOT NULL,
    "sunday" BOOLEAN NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "fk_id_contractor" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "access" "Access" NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "resetPassword" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status" NOT NULL DEFAULT 'INACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" SERIAL NOT NULL,
    "fk_id_contractor" INTEGER NOT NULL,
    "fk_id_client" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "monday" BOOLEAN NOT NULL,
    "tuesday" BOOLEAN NOT NULL,
    "wednesday" BOOLEAN NOT NULL,
    "thursday" BOOLEAN NOT NULL,
    "friday" BOOLEAN NOT NULL,
    "saturday" BOOLEAN NOT NULL,
    "sunday" BOOLEAN NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quarters" (
    "id" SERIAL NOT NULL,
    "fk_id_job" INTEGER NOT NULL,
    "value_hour" DOUBLE PRECISION NOT NULL,
    "year" INTEGER NOT NULL,
    "month" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "taxes" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "shirts" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "quarters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" BIGSERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_id_quarter" INTEGER NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contractors_email_key" ON "contractors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "contractors_fk_id_account_key" ON "contractors"("fk_id_account");

-- CreateIndex
CREATE UNIQUE INDEX "clients_fk_id_account_key" ON "clients"("fk_id_account");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_fk_id_contractor_fkey" FOREIGN KEY ("fk_id_contractor") REFERENCES "contractors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_fk_id_client_fkey" FOREIGN KEY ("fk_id_client") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractors" ADD CONSTRAINT "contractors_fk_id_account_fkey" FOREIGN KEY ("fk_id_account") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_fk_id_account_fkey" FOREIGN KEY ("fk_id_account") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_fk_id_contractor_fkey" FOREIGN KEY ("fk_id_contractor") REFERENCES "contractors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_fk_id_contractor_fkey" FOREIGN KEY ("fk_id_contractor") REFERENCES "contractors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_fk_id_client_fkey" FOREIGN KEY ("fk_id_client") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quarters" ADD CONSTRAINT "quarters_fk_id_job_fkey" FOREIGN KEY ("fk_id_job") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_fk_id_quarter_fkey" FOREIGN KEY ("fk_id_quarter") REFERENCES "quarters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
