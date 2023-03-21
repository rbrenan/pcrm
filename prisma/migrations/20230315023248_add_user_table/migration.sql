/*
  Warnings:

  - Added the required column `user_id` to the `person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `person` ADD COLUMN `user_id` VARCHAR(64) NOT NULL;

-- CreateTable
CREATE TABLE `user` (
    `user_id` VARCHAR(64) NOT NULL,

    UNIQUE INDEX `user_id_UNIQUE`(`user_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `person` ADD CONSTRAINT `fk_person_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- RenameIndex
ALTER TABLE `prefix` RENAME INDEX `previx_id_UNIQUE` TO `prefix_id_UNIQUE`;
