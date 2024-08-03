INSERT INTO department (name)
VALUES ("MANAGEMENT"),("SALES"),("HR"),("QUALITY CHECK"),("OFFICE");

INSERT INTO role (job, pay, department_id)
VALUES ("BRANCH MANAGER", 121221, 1),("SALESMAN",4004,1),("ACCOUNTANT",10,2);

INSERT INTO employee (fName, lName, role_id, manager_id)
VALUES ("TYLER","PAYNE",1,2), ("NICOLAS", "HANAMAN",2,NULL);


