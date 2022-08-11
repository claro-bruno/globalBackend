-- AlterTable
ALTER TABLE `companies` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `contractors` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE `contractorCompanies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_id_contractor` INTEGER NOT NULL,
    `fk_id_company` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `value_per_hour` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `contractorCompanies` ADD CONSTRAINT `contractorCompanies_fk_id_contractor_fkey` FOREIGN KEY (`fk_id_contractor`) REFERENCES `contractors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contractorCompanies` ADD CONSTRAINT `contractorCompanies_fk_id_company_fkey` FOREIGN KEY (`fk_id_company`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
