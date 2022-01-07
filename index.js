const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "app",
    password: "app",
    database: "testing_platform"
});

connection.query("SELECT * FROM student WHERE index_number = ?;", ["2020230129"], logQuery);

function logQuery(error, rows, fields){
    if(error){
        console.log("There was an error: ", error);
        return;
    }

    for(let row of rows){
        console.log(row.student_id, row.first_name);
    }

}