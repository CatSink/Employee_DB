INSERT INTO department (title)
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales'),
       ('Marketing'),
       ('Customer Services'),
       ('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', 100000, 4),
       ('Sales Specialist', 80000, 4),
       ('Customer Services Lead', 90000, 6),
       ('Customer Services Specialist', 80000, 6),
       ('Marketing Lead', 105000, 5),
       ('Marketing Specialist', 100000, 5),
       ('Human Resources Lead', 150000, 7),
       ('Human Resources Specialist', 110000, 7),
       ('Lead Engineer', 150000, 1),
       ('Software Engineer', 120000, 1),
       ('Account Manager', 160000, 2),
       ('Accountant', 125000, 2),
       ('Legal Team Lead', 250000, 3),
       ('Lawyer', 190000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Jesse', 'Freedman', 1, NULL),
       ('Fiona', 'Goosedown', 2, 1),
       ('Raymond', 'Frieze', 3, NULL),
       ('Alma', 'Yoder', 4, 3),
       ('Elane', 'Terrell', 5, NULL),
       ('Peter', 'Petigrew', 6, 5),
       ('Giovonni', 'Gnoche', 7, NULL),
       ('Erich', 'Vanallen', 8, NULL);
 