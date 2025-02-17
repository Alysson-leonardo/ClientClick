-- CreateTable
CREATE TABLE `cliente` (
    `id_cliente` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `nascimento` DATE NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `senha` VARCHAR(80) NOT NULL,

    UNIQUE INDEX `id_cliente_UNIQUE`(`id_cliente`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`id_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prestador` (
    `id_prestador` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_prestador` VARCHAR(45) NOT NULL,
    `nascimento_prestador` DATE NOT NULL,
    `profissao_prestador` VARCHAR(45) NOT NULL,
    `email_prestador` VARCHAR(45) NOT NULL,
    `senha_prestador` VARCHAR(80) NOT NULL,
    `cidade_prestador` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `id_prestador_UNIQUE`(`id_prestador`),
    UNIQUE INDEX `email_prestador_UNIQUE`(`email_prestador`),
    PRIMARY KEY (`id_prestador`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pedido` (
    `id_pedido` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cliente_FK` INTEGER NOT NULL,
    `nome_pedido` VARCHAR(100) NOT NULL,
    `valor_pedido` FLOAT NOT NULL,

    INDEX `pedido_id_cliente_FK_idx`(`id_cliente_FK`),
    PRIMARY KEY (`id_pedido`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pedido` ADD CONSTRAINT `pedido_id_cliente_FK_fkey` FOREIGN KEY (`id_cliente_FK`) REFERENCES `cliente`(`id_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;
