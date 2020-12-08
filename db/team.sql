DROP DATABASE IF EXISTS team_infoDB;

CREATE DATABASE team_infoDB;

USE team_infoDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2),
  department_id INT REFERENCES department.id,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT REFERENCES role.id,
  manager_id INT REFERENCES employee.id,
  PRIMARY KEY (id)
);