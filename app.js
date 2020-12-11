const connection = require("./connection");
const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const { ROLE } = require("./questions/color");
const { DEPARTMENT } = require("./questions/color");
const { EMPLOYEE } = require("./questions/color");
const { VIEW } = require("./questions/color");
const { UPDATEEMP } = require("./questions/color");
const {
  addDept,
  addRole,
  addEmployee,
  departmentSearch,
  viewRoles,
  viewEmployees,
  updateEmpRoles,
} = require("./Assets/functions");

const longText =
  "Efficient employee management. " +
  "Including reliable and secure " +
  "data protection! ";
logoArt();

// Start our application

init();

// This function contains the main menue and the associated switch cases
async function init() {
  const { action } = await inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      `Add ${DEPARTMENT}`,
      `Add ${ROLE}`,
      `Add ${EMPLOYEE}`,
      `${VIEW} Departments`,
      `${VIEW} Roles`,
      `${VIEW} Employess`,
      `${UPDATEEMP}`,
      "exit",
    ],
  });

  switch (action) {
    case `Add ${DEPARTMENT}`:
      await addDept();
      init();
      break;
    case `Add ${ROLE}`:
      await addRole();
      init();
      break;
    case `Add ${EMPLOYEE}`:
      await addEmployee();
      init();
      break;
    case `${VIEW} Departments`:
      await departmentSearch();
      init();
      break;
    case `${VIEW} Roles`:
      await viewRoles();
      init();
      break;
    case `${VIEW} Employess`:
      await viewEmployees();
      init();
      break;
    case `${UPDATEEMP}`:
      await updateEmpRoles();
      init();
      break;
    case "exit":
      process.exit(0);
      break;
    default:
      break;
  }
}

// This function gives renders the logo art at the app load.
function logoArt() {
  console.log(
    logo({
      name: "Employee DB",
      font: "Speed",
      lineChars: 10,
      padding: 2,
      margin: 3,
      borderColor: "grey",
      logoColor: "bold-green",
      textColor: "green",
    })
      .emptyLine()
      .right("version 1.0.0")
      .emptyLine()
      .center(longText)
      .render()
  );
}
