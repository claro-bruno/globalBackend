-- AlterTable
ALTER TABLE `payments` ADD COLUMN `fk_id_contractor` INTEGER NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_fk_id_contractor_fkey` FOREIGN KEY (`fk_id_contractor`) REFERENCES `contractors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
