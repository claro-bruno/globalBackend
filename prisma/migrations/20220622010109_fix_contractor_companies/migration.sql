/*
  Warnings:

  - Added the required column `login` to the `contractors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `contractors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contractors` ADD COLUMN `login` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;
