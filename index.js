const inquirer = require("inquirer");
const {
  queryDepartment,
  queryRoles,
  queryEmployees,
  newDepartment,
  newRole,
  newEmployee,
  updateEmployee,
} = require('./db/queries.js');

const questions = {
  type: 'list',
  message: 'What would you like to do?',
  name: 'mainMenu',
  choices: [
    { name: 'View All Departments', value: 'View All Departments'},
    { name: 'View All Roles', value: 'View All Roles' },
    { name: 'View All Employees', value: 'View All Employees' },
    { name: 'Add a Department', value: 'Add a Department' },
    { name: 'Add a Role', value: 'Add a Role' },
    { name: 'Add an Employee', value: 'Add an Employee' },
    { name: 'Update an Employee Role', value: 'Update an Employee Role'},
    { name: 'Exit', value: 'Exit' },
  ],
};

function runPrompt() {
  inquirer.prompt(questions).then((response) => {
    const selectedOption = response.mainMenu;

    switch (selectedOption) {
      case 'View All Departments':
        viewDepartments();
        break;
      case 'View All Roles':
        viewRoles();
        break;
      case 'View All Employees':
        viewEmployees();
        break;
      case 'Add a Department':
        addDepartment();
        break;
      case 'Add a Role':
        addRole();
        break;
      case 'Add an Employee':
        addEmployee();
        break;
      case 'Update an Employee Role':
        updateEmployeeRole();
        break;
      case 'Exit':
        console.log('Exiting...\n');
        process.exit();
    }
  });
}

function viewDepartments() {
  queryDepartment().then(function (res) {
    console.log("");
    console.table(res[0]);
    runPrompt();
  });
}

function viewRoles() {
  queryRoles().then(function (res) {
    console.log("");
    console.table(res[0]);
    runPrompt();
  });
}

function viewEmployees() {
  queryEmployees().then(function (res) {
    console.log("");
    console.table(res[0]);
    runPrompt();
  });
}

function addDepartment() {
  inquirer
    .prompt({
      type: 'input',
      name: 'departmentName',
      message: 'What is the department name?',
    })
    .then(function (res) {
      const departmentName = res.departmentName;
      newDepartment(departmentName)
        .then(function () {
          console.log(`Added ${departmentName} to the database\n`);
          runPrompt();
        })
        .catch(function (err) {
          console.log(
            `Error adding ${departmentName} to the database: ${err}\n`
          );
          runPrompt();
        });
    });
}

function addRole() {
  queryDepartment().then(function (res) {
    const departmentChoice = res[0].map(function (department) {
      return {
        name: department.title,
        value: department.id,
      };
    });
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'What is the name of the employee role?',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the salary of the role?',
        },
        {
          type: 'list',
          name: 'departmentId',
          message: 'Which department does the role belong to?',
          choices: departmentChoice,
        },
      ])
      .then(function (res) {
        const title = res.title;
        const salary = res.salary;
        const departmentId = res.departmentId;
        newRole(title, salary, departmentId)
          .then(function () {
            console.log(`Added ${title} to the database\n`);
            runPrompt();
          })
          .catch(function (err) {
            console.log(`Error adding ${title} to the database: ${err}\n`);
            runPrompt();
          });
      });
  });
}

function addEmployee() {
  Promise.all([queryRoles(), queryEmployees()]).then(function (res) {
    const roleChoice = res[0][0].map(function (roles) {
      return {
        name: roles.title,
        value: roles.id,
      };
    });
    const managerChoice = res[1][0].map(function (employees) {
      return {
        name: employees.first_name + " " + employees.last_name,
        value: employees.id,
      };
    });
    managerChoice.unshift({ name: 'None', value: null });
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'firstName',
          message:"What is the employee's first name?",
        },
        {
          type: 'input',
          name: 'lastName',
          message: "What is the employee's last name?",
        },
        {
          type: 'list',
          name: 'roleId',
          message: 'What is the employee role?',
          choices: roleChoice,
        },
        {
          type: 'list',
          name: 'managerId',
          message: 'Please select the employee manager?',
          choices: managerChoice,
        },
      ])
      .then(function (res) {
        const firstName = res.firstName;
        const lastName = res.lastName;
        const roleId = res.roleId;
        const managerId = res.managerId;
        newEmployee(firstName, lastName, roleId, managerId)
          .then(function () {
            console.log(`Added ${firstName} ${lastName} to the database\n`);
            runPrompt();
          })
          .catch(function (err) {
            console.log(
              `Error adding ${firstName} ${lastName} to the database: ${err}\n`
            );
            runPrompt();
          });
      });
  });
}

function updateEmployeeRole() {
  Promise.all([queryEmployees(), queryRoles()]).then(function (res) {
    const employeeChoice = res[0][0].map(function (employee) {
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      };
    });

    const roleChoice = res[1][0].map(function (role) {
      return {
        name: role.title,
        value: role.id,
      };
    });

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: 'Please select an employee to update?',
          choices: employeeChoice,
        },
        {
          type: 'list',
          name: 'roleId',
          message: 'What is the updated employee role?',
          choices: roleChoice,
        },
      ])
      .then(function (res) {
        const roleId = res.roleId;
        const employeeId = res.employeeId;
        
        updateEmployee(employeeId, roleId)
          .then(function () {
            console.log(`Updated employee role has been added to the database\n`);
            runPrompt();
          })
          .catch(function (err) {
            console.log(`Error updating employee role: ${err}\n`
            );
            runPrompt();
          });
      });
  });
}

runPrompt();