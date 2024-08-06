const inquirer = require('inquirer');
const mysql = require("mysql2");
const cTable = require("console.table");

const connection = mysql.createConnection({

    host:'localhost',
    port:3001,
    user: "root",
    password:"",
    database:"office_db"

});

connection.connect(err =>{

    if (err) throw err;
    console.log("Connected to office database.");
    init();
})





//initialize app function

const questions = ["What action would you like to perform?",]

function init() {

    inquirer
        .prompt({
            
            type: "list",
            message: questions[0],
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

                createConnection.end();

            }


        })
            
}

function viewAllDepartments(){
    
    createConnection.query("SELECT * FROM department",function(err,res){

        if (err) throw err;
        console.table(res);
        init();

    });

};

function viewAllRoles(){

    connection.query("r.id,r.job,d.name AS department, r.pay, FROM role r JOIN department d ON r.department_id = di.id",(err,res) => {

        if(err) throw err;
        console.table(res);
        init();

    });

};

function viewAllEmployees(){

    connection.query(`SELECT e.id,e.fName,e.lName,r.job,d.name AS department, r.pay, CONCAT(m.fName, " ", m.lName) AS manager FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id`,(err,res) =>{

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

        connection.query(`INSERT INTO department (name) VALUES (?)`, [answer.addedDepartment], (err,res) => {

            if(err) throw err;
            console.log("Your department has been inserted into the database.");
            init();

        });



    });

};
    

function addARole(){

    connection.query(`SELECT id,name FROM department`, (err,res) =>{

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

        connection.query(`INSERT INTO role (job, pay, department_id) VALUES (?,?,?)`, [answer.addedRole, answer.addedPay, departmentId],

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

    connection.query(`SELECT id, job FROM role`, (err,res) =>{

        if (err) throw err;

        const roleNames = res.reduce((acc,curr)=> {

            acc[curr.job] = curr.id;
            return acc;

        },{});

        connection.query(`SELECT id, CONCAT(fName," ",lName) AS name FROM employee`, (err,res) =>{

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

                connection.query(`INSERT INTO employee SET ?`,

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


