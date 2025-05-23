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
-- Table `item_to_buy`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `item_to_buy` ;

CREATE TABLE IF NOT EXISTS `item_to_buy` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `skuName` VARCHAR(2000) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS proxyshop@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'proxyshop'@'localhost' IDENTIFIED BY 'proxyshop';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'proxyshop'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
