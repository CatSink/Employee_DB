INSERT INTO department (id, name) 
VALUES( 1, 'Finance'),
    ( 2, 'Marketing'),
    (3, 'Human Resources'),
    (4, 'Customer Services'),
    (5, 'Sales Representative');
INSERT INTO role (id,title,salary,department_id)
VALUES (1, 'Sales Representative Specialist', 40,000,5),
    (2, 'Customer Services Specialist', 45,000,4),
    (3, 'Human Resources Specialist', 50,000,3),
    (4, 'Marketing Specialist', 55,000,2),
    (5, 'Finance Specialist', 60,000,1);
INSERT INTO employee (id, first_name, last_name, manager_id) 
VALUES (1, 'Gina', 'King',1),
       (2, 'Giovonni', 'Gnoche', 2),
       (3, 'Jesse', 'Freeman', 3),
       (4, 'Fiona', 'Applegate', 4);
       (5, 'Daniel', 'Frieze', 5),
       (6, 'Erich', 'Lazier',3),
       (7, 'Elane', 'Goosedown',2),
       (8, 'Trish', 'Piedmont',1),
       (9, 'Peter', 'Petigrew',5),
       (10, 'Jaimie', 'Holmes',4);      