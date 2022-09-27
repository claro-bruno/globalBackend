/*
  Warnings:

  - You are about to drop the column `fk_id_quarter` on the `payments` table. All the data in the column will be lost.
  - Added the required column `month` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `payments` DROP FOREIGN KEY `payments_fk_id_quarter_fkey`;

-- AlterTable
ALTER TABLE `payments` DROP COLUMN `fk_id_quarter`,
    ADD COLUMN `month` VARCHAR(191) NOT NULL,
    ADD COLUMN `year` INTEGER NOT NULL;
