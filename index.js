// Need to npm install before you can run the application

const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
//   Enter your unique password for your MySQL database
  password: "",
//   Enter your unique database name that holds your data
  database: ""
});

// Begin connection
connection.connect(function (err) {
    if (err) throw err;
    console.log(`\n connected as id ${connection.threadId} \n`);
    askQuestions();
});

// Prompt users when they begin the application
function askQuestions() {
    inquirer.prompt({
        message: "what would you like to do?",
        type: "list",
        choices: [
            "add department",
            "add employee",
            "add role",
            "delete department",
            "delete employee",
            "delete role",
            "update employee role",
            "view all departments",
            "view all employees",
            "view all roles",
            "QUIT"
        ],
        name: "choice"
    }).then(answers => {
        // Utilizing a switch case to efficiently direct the application to the appropriate place
        switch (answers.choice) {
            case "add department":
                addDepartment()
                break;

            case "add employee":
                addEmployee()
                break;

            case "add role":
                addRole()
                break;

            case "delete department":
                deleteDepartment()
                break;

            case "delete employee":
                deleteEmployee()
                break;

            case "delete role":
                deleteRole()
                break;

            case "update employee role":
                updateEmployeeRole();
                break;

            case "view all roles":
                viewRoles()
                break;

            case "view all employees":
                viewEmployees()
                break;

            case "view all departments":
                viewDepartments()
                break;

            default:
                connection.end()
                break;
        }
    })
}

// Adds a department to the department table in the database
function addDepartment() {
    inquirer.prompt([{
        type: "input",
        name: "department",
        message: "What is the department that you want to add?"
    }, ]).then(function(res) {
        connection.query('INSERT INTO department (name) VALUES (?)', [res.department], function(err, data) {
            if (err) throw err;
            console.log(`Successfully Inserted ${res.department} into department database. \n`);
            askQuestions();
        })
    })
}

// Adds an employee to the employee table in the database
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
            console.log(`Successfully Inserted ${res.firstName} into employee database. \n`);
            askQuestions();
        })
    })
}

// Adds a role to the role table in the database
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
    ]).then(function (res) {
        connection.query("INSERT INTO role (title, salary, department_id) values (?, ?, ?)", [res.title, res.salary, res.department_id], function (err, data) {
            if (err) throw err;
            console.log(`Successfully Inserted ${res.title} into role database. \n`);
            askQuestions();
        })
    })

}

// Deletes a department from the department table in the database
function deleteDepartment() {
    inquirer.prompt([{
        type: "input",
        name: "department_id",
        message: "What is the department id that you want to delete?"
    }, ]).then(function(res) {
        connection.query('DELETE FROM department WHERE id = ?', [res.department_id], function(err, data) {
            if (err) throw err;
            console.log(`Successfully Deleted ${res.department_id} from department database. \n`);
            askQuestions();
        })
    })
}

// Deletes an employee from the employee table in the database
function deleteEmployee() {
    inquirer.prompt([{
        type: "input",
        name: "employee_id",
        message: "What is the employee id that you want to delete?"
    }, ]).then(function(res) {
        connection.query('DELETE FROM employee WHERE id = ?', [res.employee_id], function(err, data) {
            if (err) throw err;
            console.log(`Successfully Deleted ${res.employee_id} from employee database. \n`);
            askQuestions();
        })
    })
}

// Deletes a role from the role table in the database
function deleteRole() {
    inquirer.prompt([{
        type: "input",
        name: "role_id",
        message: "What is the role id that you want to delete?"
    }, ]).then(function(res) {
        connection.query('DELETE FROM role WHERE id = ?', [res.role_id], function(err, data) {
            if (err) throw err;
            console.log(`Successfully Deleted ${res.role_id} from role database. \n`);
            askQuestions();
        })
    })
}

// Updates the role_id for an employee in the employee databse
function updateEmployeeRole() {
    inquirer.prompt([
        {
            message: "which employee would you like to update? (enter employee id number)",
            type: "input",
            name: "id"
        }, {
            message: "enter the new role ID:",
            type: "number",
            name: "role_id"
        }
    ]).then(function (response) {
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [response.role_id, response.id], function (err, data) {
            if (err) throw err;
            console.table(data);
            askQuestions();
        })
    })
}

// Allows user to view all departments in the department table in the database
function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        console.log(`\n`);
        console.table(data);
        askQuestions();
    })
}

// Allows user to view all employees in the employee table in the database
function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;
        console.log(`\n`);
        console.table(data);
        askQuestions();
    })
}

// Allows user to view all roles in the roll table in the database
function viewRoles() {
    connection.query("SELECT * FROM role", function (err, data) {
        if (err) throw err;
        console.log(`\n`);
        console.table(data);
        askQuestions();
    })
}