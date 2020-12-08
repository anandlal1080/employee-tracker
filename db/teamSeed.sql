USE employeeTracker_DB;
INSERT INTO department(name) VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");
INSERT INTO role(title, salary, department_id) VALUES ("Sales Lead", 100000, 1), ("Salesperson", 75000,1), ("Lead Engineer", 120000, 2), ("Software Engineer", 100000, 2), ("Accountant", 70000, 3), ("Lawyer", 105000, 4), ("Legal Team Lead", 135000, 4);
INSERT INTO employee(first_name, last_name, role_id, manager_id) 
VALUES ("John", "Doe", 1, 3), ("Jack", "Boe", 2, 1), ("Mary", "Smith", 3, null),
("Brad", "Reev", 4, 3), ("Ryan", "Holt", 5, null), ("Elen", "Brook", 6, 7), ("Garry", "Stone", 7, null)