/*
  Warnings:

  - Added the required column `perfil` to the `contractors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contractors` ADD COLUMN `perfil` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `purposes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(191) NOT NULL,
    `address2` VARCHAR(191) NOT NULL,
    `type_identification` VARCHAR(191) NOT NULL,
    `identification` VARCHAR(191) NOT NULL,
    `fk_id_contractor` INTEGER NOT NULL,

    UNIQUE INDEX `purposes_fk_id_contractor_key`(`fk_id_contractor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `purposes` ADD CONSTRAINT `purposes_fk_id_contractor_fkey` FOREIGN KEY (`fk_id_contractor`) REFERENCES `contractors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
