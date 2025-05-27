-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema proxyshopdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `proxyshopdb` ;

-- -----------------------------------------------------
-- Schema proxyshopdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `proxyshopdb` DEFAULT CHARACTER SET utf8 ;
USE `proxyshopdb` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NULL,
  `enabled` TINYINT NULL,
  `role` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `store`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `store` ;

CREATE TABLE IF NOT EXISTS `store` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `logo_image_url` VARCHAR(2000) NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `item_to_buy`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `item_to_buy` ;

CREATE TABLE IF NOT EXISTS `item_to_buy` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sku` VARCHAR(200) NULL,
  `user_id` INT NOT NULL,
  `store_id` INT NOT NULL,
  `name` VARCHAR(2000) NULL,
  `description` TEXT NULL,
  `image_url` VARCHAR(2000) NULL,
  `last_purchased` DATETIME NULL,
  `needed` TINYINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_item_to_buy_user_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_item_to_buy_store1_idx` (`store_id` ASC) VISIBLE,
  CONSTRAINT `fk_item_to_buy_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_item_to_buy_store1`
    FOREIGN KEY (`store_id`)
    REFERENCES `store` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS proxyshop@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'proxyshop'@'localhost' IDENTIFIED BY 'proxyshop';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'proxyshop'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `proxyshopdb`;
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`) VALUES (1, 'mike', 'mike', 1, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`) VALUES (2, 'rob', 'rob', 1, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `store`
-- -----------------------------------------------------
START TRANSACTION;
USE `proxyshopdb`;
INSERT INTO `store` (`id`, `name`, `logo_image_url`, `description`) VALUES (1, 'Trader Joe\'s', NULL, 'Good stuff');
INSERT INTO `store` (`id`, `name`, `logo_image_url`, `description`) VALUES (2, 'Costco', NULL, 'Big stuff');

COMMIT;


-- -----------------------------------------------------
-- Data for table `item_to_buy`
-- -----------------------------------------------------
START TRANSACTION;
USE `proxyshopdb`;
INSERT INTO `item_to_buy` (`id`, `sku`, `user_id`, `store_id`, `name`, `description`, `image_url`, `last_purchased`, `needed`) VALUES (1, '12', 1, 1, 'Textured Vegetable Protien', NULL, NULL, NULL, NULL);
INSERT INTO `item_to_buy` (`id`, `sku`, `user_id`, `store_id`, `name`, `description`, `image_url`, `last_purchased`, `needed`) VALUES (2, '12345', 2, 2, '55 gallon drum of Mayo', NULL, NULL, NULL, NULL);

COMMIT;

