const connection = require("./connection");
const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const { ROLE } = require("./questions/color");
const { DEPARTMENT } = require("./questions/color");
const { EMPLOYEE } = require("./questions/color");
const { VIEW } = require("./questions/color");
const { UPDATEEMP } = require("./questions/color");

const longText =
  "Efficient employee management. " +
  "with reliable and secure, " +
  "data protection! ";
logoArt();

// Start our application

init();

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
      //   departmentSearch();
      break;
    case `Add ${ROLE}`:
      console.log("Hi");
      //   multiSearch();
      break;
    case `Add ${EMPLOYEE}`:
      rangeSearch();
      break;
    case `${VIEW} Departments`:
      departmentSearch();
      break;
    case `${VIEW} Roles`:
      viewRoles();
      break;
    case `${VIEW} Employess`:
      viewEmployees();
      break;
    case `${UPDATEEMP}`:
      songAndAlbumSearch();
      break;
    case "exit":
      process.exit(0);
      break;
    default:
      break;
  }
}

async function departmentSearch() {
  const query = "select name from department;";
  // SELECT all departments
  const data = await connection.query(query);
  console.table(data);
  init();
}

async function viewRoles() {
  const query = "select title from role";
  // SELECT all roles
  const data = await connection.query(query);
  console.table(data);
  init();
}

async function viewEmployees() {
  const query = `select  

  department.name AS 'Department',
  role.title AS 'Job Title',
  IFNULL(CONCAT(m.first_name, ' ', m.last_name),
              'Top Manager') AS 'Manager',
  CONCAT(e.first_name,' ',e.last_name) AS 'Direct report', 
  role.salary AS 'Employee Salary'
  from employee e
  left join employee m on m.id = e.manager_id
  inner join role on e.role_id = role.id
  inner join department on role.department_id = department.id
  ORDER BY manager DESC`;
  // SELECT all roles
  const data = await connection.query(query);
  console.table(data);
  init();
}

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
