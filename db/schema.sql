DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;


DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE TABLE department(id INTEGER, name VARCHAR(30) NOT NULL);

CREATE TABLE role(id INTEGER,job VARCHAR(30) NOT NULL, pay DECIMAL NOT NULL, department_id INT);

CREATE TABLE employee(id INTEGER, fName VARCHAR(30) NOT NULL, lName VARCHAR(30) NOT NULL, role_id INT, manager_id INT);

\c company_db