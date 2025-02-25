/*
  Warnings:

  - You are about to drop the column `id_cliente_FK` on the `pedido` table. All the data in the column will be lost.
  - Added the required column `cidade` to the `cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clienteId` to the `pedido` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `pedido` DROP FOREIGN KEY `pedido_id_cliente_FK_fkey`;

-- DropIndex
DROP INDEX `pedido_id_cliente_FK_idx` ON `pedido`;

-- AlterTable
ALTER TABLE `cliente` ADD COLUMN `cidade` VARCHAR(80) NOT NULL;

-- AlterTable
ALTER TABLE `pedido` DROP COLUMN `id_cliente_FK`,
    ADD COLUMN `clienteId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `conversa` (
    `id_conversa` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cliente_conversa` INTEGER NOT NULL,
    `id_prestador_conversa` INTEGER NOT NULL,

    UNIQUE INDEX `id_conversa_UNIQUE`(`id_conversa`),
    INDEX `conversa_id_cliente`(`id_cliente_conversa`),
    INDEX `conversa_id_prestador`(`id_prestador_conversa`),
    PRIMARY KEY (`id_conversa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `pedido_id_cliente` ON `pedido`(`clienteId`);

-- AddForeignKey
ALTER TABLE `pedido` ADD CONSTRAINT `pedido_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente`(`id_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conversa` ADD CONSTRAINT `conversa_id_cliente_conversa_fkey` FOREIGN KEY (`id_cliente_conversa`) REFERENCES `cliente`(`id_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conversa` ADD CONSTRAINT `conversa_id_prestador_conversa_fkey` FOREIGN KEY (`id_prestador_conversa`) REFERENCES `prestador`(`id_prestador`) ON DELETE RESTRICT ON UPDATE CASCADE;
