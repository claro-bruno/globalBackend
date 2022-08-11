/*
  Warnings:

  - You are about to drop the column `role` on the `accounts` table. All the data in the column will be lost.
  - The values [USER] on the enum `accounts_access` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `birthday` on the `contractors` table. All the data in the column will be lost.
  - Added the required column `dob` to the `contractors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `accounts` DROP COLUMN `role`,
    MODIFY `access` ENUM('CONTRACTOR', 'COMPANY', 'GLOBAL', 'ADMIN') NOT NULL,
    MODIFY `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'INACTIVE';

-- AlterTable
ALTER TABLE `contractors` DROP COLUMN `birthday`,
    ADD COLUMN `dob` DATETIME(3) NOT NULL,
    MODIFY `perfil` VARCHAR(191) NULL;
