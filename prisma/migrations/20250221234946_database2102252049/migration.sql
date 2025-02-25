/*
  Warnings:

  - The primary key for the `conversa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id_cliente_conversa,id_prestador_conversa]` on the table `conversa` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `conversa` DROP PRIMARY KEY,
    MODIFY `id_conversa` VARCHAR(191) NOT NULL DEFAULT '',
    ADD PRIMARY KEY (`id_conversa`);

-- CreateIndex
CREATE UNIQUE INDEX `conversa_id_cliente_conversa_id_prestador_conversa_key` ON `conversa`(`id_cliente_conversa`, `id_prestador_conversa`);

-- RenameIndex
ALTER TABLE `conversa` RENAME INDEX `id_conversa_UNIQUE` TO `conversa_id_conversa_key`;
