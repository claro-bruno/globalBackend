-- CreateTable
CREATE TABLE `payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` DOUBLE NOT NULL,
    `method` VARCHAR(191) NOT NULL,
    `fk_id_quarter` INTEGER NULL,
    `identification` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `payments_fk_id_quarter_key`(`fk_id_quarter`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contractors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `middle_name` VARCHAR(191) NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `urlProfile` VARCHAR(191) NULL,
    `urlDocumentProof` VARCHAR(191) NULL,
    `urlPrimaryResidencyProof` VARCHAR(191) NULL,
    `urlSecondaryResidencyProof` VARCHAR(191) NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'PENDING') NOT NULL DEFAULT 'ACTIVE',
    `ein` VARCHAR(191) NULL,
    `acceptTerms` BOOLEAN NOT NULL,
    `identification` VARCHAR(191) NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fk_id_account` INTEGER NULL,

    UNIQUE INDEX `contractors_email_key`(`email`),
    UNIQUE INDEX `contractors_fk_id_account_key`(`fk_id_account`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fk_id_account` INTEGER NULL,
    `start` VARCHAR(191) NOT NULL,
    `end` VARCHAR(191) NOT NULL,
    `monday` BOOLEAN NOT NULL,
    `tuesday` BOOLEAN NOT NULL,
    `wednesday` BOOLEAN NOT NULL,
    `thursday` BOOLEAN NOT NULL,
    `friday` BOOLEAN NOT NULL,
    `saturday` BOOLEAN NOT NULL,
    `sunday` BOOLEAN NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `clients_fk_id_account_key`(`fk_id_account`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `zipcode` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `fk_id_contractor` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `access` ENUM('CONTRACTOR', 'CLIENT', 'GLOBAL', 'ADMIN') NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `resetPassword` BOOLEAN NOT NULL DEFAULT false,
    `status` ENUM('ACTIVE', 'INACTIVE', 'PENDING') NOT NULL DEFAULT 'INACTIVE',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jobs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_id_contractor` INTEGER NOT NULL,
    `fk_id_client` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `monday` BOOLEAN NOT NULL,
    `tuesday` BOOLEAN NOT NULL,
    `wednesday` BOOLEAN NOT NULL,
    `thursday` BOOLEAN NOT NULL,
    `friday` BOOLEAN NOT NULL,
    `saturday` BOOLEAN NOT NULL,
    `sunday` BOOLEAN NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'PENDING') NOT NULL DEFAULT 'ACTIVE',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quarters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_id_job` INTEGER NOT NULL,
    `value_hour` DOUBLE NOT NULL,
    `year` INTEGER NOT NULL,
    `month` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` DOUBLE NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fk_id_quarter` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_fk_id_quarter_fkey` FOREIGN KEY (`fk_id_quarter`) REFERENCES `quarters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contractors` ADD CONSTRAINT `contractors_fk_id_account_fkey` FOREIGN KEY (`fk_id_account`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clients` ADD CONSTRAINT `clients_fk_id_account_fkey` FOREIGN KEY (`fk_id_account`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_fk_id_contractor_fkey` FOREIGN KEY (`fk_id_contractor`) REFERENCES `contractors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jobs` ADD CONSTRAINT `jobs_fk_id_contractor_fkey` FOREIGN KEY (`fk_id_contractor`) REFERENCES `contractors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jobs` ADD CONSTRAINT `jobs_fk_id_client_fkey` FOREIGN KEY (`fk_id_client`) REFERENCES `clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quarters` ADD CONSTRAINT `quarters_fk_id_job_fkey` FOREIGN KEY (`fk_id_job`) REFERENCES `jobs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_fk_id_quarter_fkey` FOREIGN KEY (`fk_id_quarter`) REFERENCES `quarters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
