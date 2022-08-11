-- DropForeignKey
ALTER TABLE `contractors` DROP FOREIGN KEY `contractors_fk_id_account_fkey`;

-- AlterTable
ALTER TABLE `contractors` MODIFY `fk_id_account` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `contractors` ADD CONSTRAINT `contractors_fk_id_account_fkey` FOREIGN KEY (`fk_id_account`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
