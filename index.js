const inquirer = require('inquirer');

const cTable = require("console.table");

const express = require('express');

const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database









//initialize app function

const question = "What action would you like to perform?"

function init() {

    inquirer
        .prompt({
            
            type: "list",
            message: question,
            name:"menuSelection",
            choices: ["View all departments","View all roles",
                
                "View all employees","Add a department","Add a role","Add an employee","Update an employee role"


            ]

        }).then(response => {

            if(response.menuSelection === "View all departments"){

                viewAllDepartments();

            } else if(response.menuSelection === "View all roles"){

                viewAllRoles();

            } else if(response.menuSelection === "View all employees"){

                viewAllEmployees();

            } else if(response.menuSelection === "Add a department"){

                addADepartment();

            } else if(response.menuSelection === "Add a role"){

                addARole();

            } else if(response.menuSelection === "Add an employee"){

                addAnEmployee();

            } else if(response.menuSelection === "Update an employee role"){

                updateAnEmployeeRole();

            } else{

                pool.end();

            }


        })
            
}

function viewAllDepartments(){
    
    pool.query(`SELECT * FROM department`,function(err,res){

        if (err) throw err;
        console.table(res);
        init();

    });

};

function viewAllRoles(){

    pool.query("r.id,r.job,d.name AS department, r.pay, FROM role r JOIN department d ON r.department_id = di.id",(err,res) => {

        if(err) throw err;
        console.table(res);
        init();

    });

};

function viewAllEmployees(){

    pool.query(`SELECT e.id,e.fName,e.lName,r.job,d.name AS department, r.pay, CONCAT(m.fName, " ", m.lName) AS manager FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id`,(err,res) =>{

        if (err) throw err;
        console.table(res);
        init();

    } )

}
            

function addADepartment(){

    inquirer.prompt([{

        name: "addedDepartment",
        type:"input",
        message: "What department are you adding?"

    }]).then(answer => {

        pool.query(`INSERT INTO department (name) VALUES (?)`, [answer.addedDepartment], (err,res) => {

            if(err) throw err;
            console.log("Your department has been inserted into the database.");
            init();

        });



    });

};
    

function addARole(){

    pool.query(`SELECT id,name FROM department`, (err,res) =>{

        if (err) throw err;

        const departmentNames = res.reduce((acc,curr) => {

            acc[curr.name] = curr.id;
            return acc;

        },{});
    
    inquirer.prompt([{

        name:"addedRole",
        type:"input",
        message: "What role will you add?"

    },


    {

        name:"addedPay",
        type:"input",
        message:"How much pay does this new role receive?"

    },

    {

        name:"newRoleDept",
        type:"list",
        message: "To which department does this new role belong to?",
        choices: Object.keys(departmentNames),

    }

]).then(answer => {

    const departmentId = departmentNames[answer.newRoleDept];

        pool.query(`INSERT INTO role (job, pay, department_id) VALUES (?,?,?)`, [answer.addedRole, answer.addedPay, departmentId],

            function (err,res){

                if (err) throw err;
                console.log("Role has been merged into the database!");
                init();

            }

        );

})

});

};

function addAnEmployee(){

    pool.query(`SELECT id, job FROM role`, (err,res) =>{

        if (err) throw err;

        const roleNames = res.reduce((acc,curr)=> {

            acc[curr.job] = curr.id;
            return acc;

        },{});

        pool.query(`SELECT id, CONCAT(fName," ",lName) AS name FROM employee`, (err,res) =>{

            if (err) throw err;

            const managers = {};

            res.forEach((employee) =>{

                const managerName = `${employee.fName} ${employee.lName}`;
                managers[managerName] = employee.id;

            });

            inquirer.prompt([

                {

                    name:"firstName",
                    type: "input",
                    message:"Enter a first name."

                },

                {

                    name:"lastName",
                    type: "input",
                    message:"Now enter a last name."

                },

                {

                    name:"roleSelection",
                    type: "list",
                    message:"Give this worker a role",
                    choices: Object.keys(roleNames),

                },


                {

                    name:"givenManager",
                    type: "list",
                    message:"Who manages this person?",
                    choices: Object.keys(managers)

                }

            ]).then(answer=>{

                pool.query(`INSERT INTO employee SET ?`,

                    {

                        fName: answer.firstName,
                        lName: answer.lastName,
                        role_id: answer.roleSelection,
                        manager_id: answer.givenManager

                    },

                    function (err,res){

                        if (err) throw err;

                        console.log("Employee is now here!");
                        init();

                    }
                );

            });

        });

        });

    };


    const pool = new Pool(
        {
          // Enter PostgreSQL username
          user: 'postgres',
          // Enter PostgreSQL password
          password: 'Camry2025!',
          host: 'localhost',
          database: 'company_db'
      },
      console.log('Connected to the company database!'),
      
      init()
      
      
      
      )
