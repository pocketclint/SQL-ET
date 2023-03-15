const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'qwerasdf',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL server.');
    mainMenu();
});

function mainMenu() {
    inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: 'Main Menu',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee Role',
            'Remove Employee',
            'Exit'
        ]
    })
        .then((answer) => {
            switch (answer.menu) {
                case 'View All Departments':
                    viewAllDepartments();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break;
                case 'View All Employees':
                    viewAllEmployees();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
                case 'Remove Employee':
                    removeEmployee();
                    break;
                case 'Exit':
                    db.end();
                    break;
            }
        });
}

function viewAllDepartments() {
    db.query('SELECT * FROM departments', (err, results) => {
        if (err) throw err;
        console.table(results);
        mainMenu();
    });
}

function viewAllRoles() {
    db.query('SELECT * FROM roles', (err, results) => {
        if (err) throw err;
        console.table(results);
        mainMenu();
    });
}

function viewAllEmployees() {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) throw err;
        console.table(results);
        mainMenu();
    });
}

function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'department',
        message: 'Enter department name:'
    })
        .then((answer) => {
            db.query('INSERT INTO departments (name) VALUES (?)', answer.department, (err, results) => {
                if (err) throw err;
                console.log('Department added.');
                mainMenu();
            });
        });
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter title:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter salary:'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter department ID:'
        }
    ])
        .then((answer) => {
            db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [answer.title, answer.salary, answer.department_id], (err, results) => {
                if (err) throw err;
                console.log('Role added.');
                mainMenu();
            });
        });
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter first name:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter last name:'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter role ID:'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter manager ID:'
        }
    ])
        .then((answer) => {
            db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, results) => {
                if (err) throw err;
                console.log('Employee added.');
                mainMenu();
            });
        });
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter employee ID:'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter new role ID:'
        }
    ])
        .then((answer) => {
            db.query('UPDATE employees SET role_id = ? WHERE id = ?', [answer.role_id, answer.id], (err, results) => {
                if (err) throw err;
                console.log('Employee role updated.');
                mainMenu();
            });
        });
}

function removeEmployee() {
    inquirer.prompt({
        type: 'input',
        name: 'id',
        message: 'Enter employee ID:'
    })
        .then((answer) => {
            db.query('DELETE FROM employees WHERE id = ?', answer.id, (err, results) => {
                if (err) throw err;
                console.log('Employee removed.');
                mainMenu();
            });
        });
}