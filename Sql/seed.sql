-- Populating my database with some data.

USE employeesDB;

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), ("Lead Engineer", 150000, 2), ("Software Engineer", 120000, 2), ("Accountant", 125000, 3), ("Legal Team Lead", 250000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 3), ("Mike", "Chan", 2, 1), ("Ashley", "Rodriguez", 3, null), ("Kevin", "Tupik", 4, 3), ("Malia", "Brown", 5, null), ("Sarah", "Lourd", 2, null), ("Tom", "Allen", 4, 7), ("Christian", "Eckenrode", 1, 2);
