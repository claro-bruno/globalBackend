/*
  Warnings:

  - Added the required column `fk_id_contractor` to the `quarters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `quarters` ADD COLUMN `fk_id_contractor` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `quarters` ADD CONSTRAINT `quarters_fk_id_contractor_fkey` FOREIGN KEY (`fk_id_contractor`) REFERENCES `contractors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
