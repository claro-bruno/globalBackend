/*
  Warnings:

  - You are about to drop the `Authors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Authors`;

-- CreateTable
CREATE TABLE `contractors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `identification` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `birthday` DATETIME(3) NULL,
    `telephone` VARCHAR(191) NULL,

    UNIQUE INDEX `contractors_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `companies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
