/*
  Warnings:

  - You are about to drop the column `login` on the `contractors` table. All the data in the column will be lost.
  - Added the required column `username` to the `contractors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contractors` DROP COLUMN `login`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    MODIFY `role` ENUM('USER', 'GLOBAL', 'ADMIN') NOT NULL DEFAULT 'USER';
