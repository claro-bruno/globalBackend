-- DropForeignKey
ALTER TABLE `companies` DROP FOREIGN KEY `companies_fk_id_account_fkey`;

-- AlterTable
ALTER TABLE `companies` MODIFY `fk_id_account` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `companies` ADD CONSTRAINT `companies_fk_id_account_fkey` FOREIGN KEY (`fk_id_account`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
