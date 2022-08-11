/*
  Warnings:

  - Added the required column `rangeHour` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `accounts` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `addresses` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `appointments` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `companies` ADD COLUMN `friday` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `monday` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `rangeHour` VARCHAR(191) NOT NULL,
    ADD COLUMN `satuday` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `sunday` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `thuesday` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `tuesday` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `wednesday` BOOLEAN NOT NULL DEFAULT true;
