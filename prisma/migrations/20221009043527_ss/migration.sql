/*
  Warnings:

  - Added the required column `shirts` to the `quarters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxes` to the `quarters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `quarters` ADD COLUMN `shirts` DOUBLE NOT NULL,
    ADD COLUMN `taxes` DOUBLE NOT NULL;
