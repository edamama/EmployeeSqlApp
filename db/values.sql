
\c company_db

INSERT INTO department (id,name)
VALUES (1,"MANAGEMENT"),(2,"SALES"),(3,"HR"),(4,"QUALITY CHECK"),(5,"OFFICE");

INSERT INTO role (id,job, pay, department_id)
VALUES (1,"BRANCH MANAGER", 121.221, 1),(2,"SALESMAN",400.4,1),(3,"ACCOUNTANT",100.54,2);

INSERT INTO employee (id,fName,lName,role_id,manager_id)
VALUES (4,"TYLER","PAYNE",1,2);


