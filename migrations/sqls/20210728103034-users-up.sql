/* Replace with your SQL commands */
CREATE TABLE `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `gender` VARCHAR(10) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `spak_task_assignment`.`users` 
ADD UNIQUE INDEX `email_UNIQUE` (`email` ASC);