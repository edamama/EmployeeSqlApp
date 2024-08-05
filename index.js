const inquirer = require('inquirer');
const mysql = require("mysql2");
const cTable = require("console.table");

const connection = mysql.createConnection({

    host:'localhost',
    port:3001,
    user: "root",
    password:"Camry2025!",
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

        console.table(res);
        startMenu();

    })

}

//function viewAllRoles(){

    //createConnection.query("SELECT * FROM role", function(err,res){

        

    //}

//}
    
    

