/*
  Warnings:

  - You are about to drop the column `address` on the `contractors` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `contractors` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `contractors` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `contractors` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `contractors` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fk_id_account]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fk_id_account]` on the table `contractors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fk_id_account` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `contractors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_id_account` to the `contractors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `contractors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `contractors` table without a default value. This is not possible if the table is not empty.
  - Made the column `identification` on table `contractors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthday` on table `contractors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telephone` on table `contractors` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `companies` ADD COLUMN `fk_id_account` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `contractors` DROP COLUMN `address`,
    DROP COLUMN `name`,
    DROP COLUMN `password`,
    DROP COLUMN `role`,
    DROP COLUMN `username`,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `fk_id_account` INTEGER NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL,
    MODIFY `identification` VARCHAR(191) NOT NULL,
    MODIFY `birthday` DATETIME(3) NOT NULL,
    MODIFY `telephone` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `zipcode` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `fk_id_contractor` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `access` ENUM('USER', 'GLOBAL', 'ADMIN') NOT NULL,
    `role` ENUM('CONTRACTOR', 'COMPANY') NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date_at` DATETIME(3) NOT NULL,
    `value` DOUBLE NOT NULL,
    `fk_id_relation` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `companies_fk_id_account_key` ON `companies`(`fk_id_account`);

-- CreateIndex
CREATE UNIQUE INDEX `contractors_fk_id_account_key` ON `contractors`(`fk_id_account`);

-- AddForeignKey
ALTER TABLE `contractors` ADD CONSTRAINT `contractors_fk_id_account_fkey` FOREIGN KEY (`fk_id_account`) REFERENCES `accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `companies` ADD CONSTRAINT `companies_fk_id_account_fkey` FOREIGN KEY (`fk_id_account`) REFERENCES `accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_fk_id_contractor_fkey` FOREIGN KEY (`fk_id_contractor`) REFERENCES `contractors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_fk_id_relation_fkey` FOREIGN KEY (`fk_id_relation`) REFERENCES `contractorCompanies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
