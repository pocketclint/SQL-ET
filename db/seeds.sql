INSERT INTO departments (name)
VALUES 
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');
INSERT INTO roles (title, salary, department_id)
VALUES 
    ('Sales Lead', 95000, 1),
    ('Salesperson', 75000, 1),
    ('Lead Engineer', 185000, 2),
    ('Software Engineer', 130000, 2),
    ('Account Manager', 150000, 3),
    ('Accountant', 120000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 200000, 4);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Doh', 2, 1),
    ('Jawn', 'Son', 3, NULL),
    ('Jane', 'Dawes', 4, 3),
    ('John', 'Dough', 5, NULL),
    ('Janet', 'Dove', 6, 5),
    ('Jon', 'Smith', 7, NULL),
    ('James', 'Smythe', 8, 7);