// Load modules
const express = require("express");
const mysql = require("mysql2");

// Connect to database
const database = mysql.createConnection({
    host: "localhost",
    user: "app",
    password: "app",
    database: "testing_platform"
});

// Create an express application
const app = express();

//Create first get method
app.get("/student/", (request, response) =>{
    let indexNumber = request.query.index;

    database.promise().query(
        "SELECT * FROM student WHERE index_number = ? LIMIT 1;",
        [indexNumber]
    ).then( (rows) => {

        if(rows[0].length == 0){
            response.status(404);
            response.send("Student not found!");
            return;
        }

        response.status(200);
        response.send(JSON.stringify(rows[0][0]));
    }
    ).catch(error => {
        console.log("Error: ", error);
        response.status(500);
        response.send("Internal Server Error");
    });

});

const port = 4000;

app.listen(port);

console.log(`Server running and listening on port ${port}`);