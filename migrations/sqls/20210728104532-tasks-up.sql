/* Replace with your SQL commands */
CREATE TABLE `tasks` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `priority` INT(5) NOT NULL,
  `isDeleted` TINYINT(1) NOT NULL DEFAULT '0',
  `userId` INT(11) NOT NULL,
  `isCompleted` TINYINT(1) NOT NULL DEFAULT '0'
  PRIMARY KEY (`id`),
  INDEX `tasks_ibfk_1_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `tasks_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `spak_task_assignment`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);