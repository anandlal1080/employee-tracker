const { ROLE } = require("../questions/color");
const { DEPARTMENT } = require("../questions/color");
const { EMPLOYEE } = require("../questions/color");
const { VIEW } = require("../questions/color");
const { UPDATEEMP } = require("../questions/color");
const connection = require("../connection");
const inquirer = require("inquirer");

async function addDept() {
  const dept = await inquirer.prompt([
    {
      name: "name",
      message: `What is the ${DEPARTMENT} name?`,
    },
  ]);

  var query = await connection.query("INSERT INTO department SET ?", {
    name: dept.name,
  });
  console.log(` ${DEPARTMENT} inserted!\n`);
}

async function addRole() {
  const deptOpts = "select id, name from department;";
  const data = await connection.query(deptOpts);

  const role = await inquirer.prompt([
    {
      name: "title",
      message: `What is the ${ROLE} name?`,
    },
    {
      name: "salary",
      message: `What is the salary for this ${ROLE}? `,
    },
    {
      name: "dept",
      message: `What is the ${DEPARTMENT} for this ${ROLE}? `,
      type: "list",
      choices: data,
    },
  ]);

  var newQ = `select id from department where name = "${role.dept}"`;
  var deptQuery = await connection.query(newQ);

  var query = await connection.query("INSERT INTO role SET ?", {
    title: role.title,
    salary: role.salary,
    department_id: deptQuery[0].id,
  });
  console.log(` ${ROLE} inserted!\n`);
}

async function addEmployee() {
  const roleId = "select id, title from role;";
  const roleData = await connection.query(roleId);
  const empOpts =
    "select id, CONCAT(first_name,' ',last_name) AS 'Name' from employee;";
  const empData = await connection.query(empOpts);

  const emp = await inquirer.prompt([
    {
      name: "first_name",
      message: `What is the ${EMPLOYEE} First Name?`,
    },
    {
      name: "last_name",
      message: `What is the ${EMPLOYEE} Last Name?`,
    },
    {
      name: "role_id",
      message: `What is the ${ROLE} for this ${EMPLOYEE}? `,
      type: "list",
      choices: roleData.map((roleItem) => ({
        name: roleItem.title,
        value: roleItem.id,
      })),
    },
    {
      name: "mngr_id",
      message: `Who is the Manager for this ${EMPLOYEE}? `,
      type: "list",
      choices: empData.map((empItem) => ({
        name: empItem.Name,
        value: empItem.id,
      })),
    },
  ]);

  console.log(emp.mngr_id);
  console.log(emp.role_id);
  var query = await connection.query("INSERT INTO employee SET ?", {
    first_name: emp.first_name,
    last_name: emp.last_name,
    role_id: emp.role_id,
    manager_id: emp.mngr_id,
  });
  console.log(` ${EMPLOYEE} inserted!\n`);
}

async function departmentSearch() {
  const query = "select name from department;";
  // SELECT all departments
  const data = await connection.query(query);
  console.table(data);
}

async function viewRoles() {
  const query = "select title from role";
  // SELECT all roles
  const data = await connection.query(query);
  console.table(data);
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
}

async function updateEmpRoles() {
  const query =
    "select id, CONCAT(first_name,' ',last_name) AS 'Name' from employee";
  const data = await connection.query(query);
  const roleQuery = "select id, title from role";
  const roleData = await connection.query(roleQuery);

  const updateRole = await inquirer.prompt([
    {
      name: "role",
      message: `Who is the ${EMPLOYEE}'s Role to update? `,
      type: "list",
      choices: data.map((empItem) => ({
        name: empItem.Name,
        value: empItem.id,
      })),
    },
    {
      name: "new_role",
      message: `What is the new ${ROLE}? `,
      type: "list",
      choices: roleData.map((roleItem) => ({
        name: roleItem.title,
        value: roleItem.id,
      })),
    },
  ]);
  var newQuery = connection.query("UPDATE employee SET ? WHERE ?", [
    {
      role_id: updateRole.new_role,
    },
    {
      id: updateRole.role,
    },
  ]);
  console.log(` ${ROLE} updated!\n`);
}

module.exports = {
  addDept,
  addRole,
  addEmployee,
  departmentSearch,
  viewRoles,
  viewEmployees,
  updateEmpRoles,
};
