const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Momandme1!@",
  database: "employeesDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(`\n connected as id ${connection.threadId} \n`);
    askQuestions();
});

function askQuestions() {
    inquirer.prompt({
        message: "what would you like to do?",
        type: "list",
        choices: [
            "add department",
            "add employee",
            "add role",
            "update employee role",
            "view all departments",
            "view all employees",
            "view all roles",
            "QUIT"
        ],
        name: "choice"
    }).then(answers => {
        // console.log(answers.choice);
        switch (answers.choice) {
            case "view all roles":
                viewRoles()
                break;

            case "view all employees":
                viewEmployees()
                break;

            case "view all departments":
                viewDepartments()
                break;

            case "add employee":
                addEmployee()
                break;

            case "add department":
                addDepartment()
                break;

            case "add role":
                addRole()
                break;

            case "update employee role":
                updateEmployeeRole();
                break;

            default:
                connection.end()
                break;
        }
    })
}

function viewRoles() {
    connection.query("SELECT * FROM role", function (err, data) {
        if (err) throw err;
        console.log(`\n`);
        console.table(data);
        askQuestions();
    })
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;
        console.log(`\n`);
        console.table(data);
        askQuestions();
    })
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        console.log(`\n`);
        console.table(data);
        askQuestions();
    })
}

function addEmployee() {
    inquirer.prompt([{
            type: "input",
            name: "firstName",
            message: "What is the employees first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employees last name?"
        },
        {
            type: "number",
            name: "roleId",
            message: "What is the employees role ID"
        },
        {
            type: "number",
            name: "managerId",
            message: "What is the employees manager's ID?"
        }
    ]).then(function(res) {
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.managerId], function(err, data) {
            if (err) throw err;
            console.log(`Successfully Inserted ${data} into employee database. \n`);
            askQuestions();
        })
    })
}

function addDepartment() {
    inquirer.prompt([{
        type: "input",
        name: "department",
        message: "What is the department that you want to add?"
    }, ]).then(function(res) {
        connection.query('INSERT INTO department (name) VALUES (?)', [res.department], function(err, data) {
            if (err) throw err;
            console.log(`Successfully Inserted ${data} into department database. \n`);
            askQuestions();
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
            message: "enter title:",
            type: "input",
            name: "title"
        }, {
            message: "enter salary:",
            type: "number",
            name: "salary"
        }, {
            message: "enter department ID:",
            type: "number",
            name: "department_id"
        }
    ]).then(function (response) {
        connection.query("INSERT INTO roles (title, salary, department_id) values (?, ?, ?)", [response.title, response.salary, response.department_id], function (err, data) {
            if (err) throw err;
            console.log(`Successfully Inserted ${data} into role database. \n`);
        })
        askQuestions();
    })

}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            message: "which employee would you like to update? (use first name only for now)",
            type: "input",
            name: "name"
        }, {
            message: "enter the new role ID:",
            type: "number",
            name: "role_id"
        }
    ]).then(function (response) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.name], function (err, data) {
            if (err) throw err;
            console.table(data);
        })
        askQuestions();
    })

}