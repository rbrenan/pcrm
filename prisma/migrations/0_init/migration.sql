-- CreateTable
CREATE TABLE `person` (
    `person_id` BINARY(16) NOT NULL,
    `first_name` VARCHAR(45) NULL,
    `last_name` VARCHAR(45) NULL,
    `middle_name` VARCHAR(45) NULL,
    `prefix_id` BINARY(16) NULL,
    `suffix_id` BINARY(16) NULL,

    UNIQUE INDEX `person_id_UNIQUE`(`person_id`),
    INDEX `fk_person_prefix_idx`(`prefix_id`),
    INDEX `fk_person_suffix_idx`(`suffix_id`),
    PRIMARY KEY (`person_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prefix` (
    `prefix_id` BINARY(16) NOT NULL,
    `prefix` VARCHAR(45) NULL,

    UNIQUE INDEX `previx_id_UNIQUE`(`prefix_id`),
    PRIMARY KEY (`prefix_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `suffix` (
    `suffix_id` BINARY(16) NOT NULL,
    `suffix` VARCHAR(45) NULL,

    UNIQUE INDEX `suffix_id_UNIQUE`(`suffix_id`),
    PRIMARY KEY (`suffix_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `person` ADD CONSTRAINT `fk_person_prefix` FOREIGN KEY (`prefix_id`) REFERENCES `prefix`(`prefix_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `person` ADD CONSTRAINT `fk_person_suffix` FOREIGN KEY (`suffix_id`) REFERENCES `suffix`(`suffix_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

