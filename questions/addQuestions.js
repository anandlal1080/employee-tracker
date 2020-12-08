const { EMPLOYEE } = require('./color');
const { DEPARTMENT } = require('./color');
const { ROLE } = require('./color');
module.exports = [
    {
        name: 'first_name',
        message: `'What is the ${EMPLOYEE} First Name? '`
    },
    {
        name: 'last_name',
        message: `'What is the ${EMPLOYEE} Last Name? '`
    },
    {
        name: 'role',
        message: 'What is the employee role?',
        type: 'list',
        choices: [`${ENGINEER}`, `${INTERN}`]
    },
    {
        name: 'github',
        message: 'What is the Engineer"s GitHub Username?',
        when: (answers) => answers.role === `${ENGINEER}`
    },
    {
        name: 'school',
        message: 'What is the Intern"s school?',
        when: (answers) => answers.role === `${INTERN}`
    },
    {
        name: 'addmore',
        message: 'Would you like to add another Employee?',
        type: 'confirm',
        
    },

]