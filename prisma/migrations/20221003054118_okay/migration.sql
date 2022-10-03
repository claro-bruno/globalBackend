/*
  Warnings:

  - You are about to drop the column `fk_id_contractor` on the `quarters` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `quarters` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `quarters` DROP FOREIGN KEY `quarters_fk_id_contractor_fkey`;

-- AlterTable
ALTER TABLE `quarters` DROP COLUMN `fk_id_contractor`,
    DROP COLUMN `status`;
