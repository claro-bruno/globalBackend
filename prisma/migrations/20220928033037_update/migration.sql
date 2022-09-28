/*
  Warnings:

  - You are about to alter the column `status` on the `clients` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum("clients_status")`.

*/
-- AlterTable
ALTER TABLE `clients` MODIFY `status` ENUM('ACTIVE', 'INACTIVE', 'PENDING') NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE `quarters` MODIFY `month` VARCHAR(191) NOT NULL;
