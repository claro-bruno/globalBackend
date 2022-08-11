/*
  Warnings:

  - You are about to drop the column `firstName` on the `contractors` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `contractors` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `contractors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `contractors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contractors` DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    ADD COLUMN `first_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(191) NOT NULL;
