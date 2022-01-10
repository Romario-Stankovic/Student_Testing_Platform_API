/* const p = new Promise( (resolve, reject) => {
    let sum = 0;
    for(let i=0; i<1000000; i++){
        sum += i;
    }

    resolve(sum);

});

p.then(result => {
    console.log(result);
});

console.log("We got here!");

const p2 = new Promise( (resolve, reject) => {

    setTimeout(() => {
        let num = (Math.random() * 5).toFixed(); // [0,5]
        if(num <= 2){
            reject("Error");
        }
    
        resolve(num);
    }, 1000);
});

p2.then(
    num => {
        console.log("Number is: " + num);
    }, 
    error => {
        console.log("Error message: " + error);
    }
);

p2.then(num => console.log(num)).catch(error => console.log(error));
 */
const o1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Map is downloaded");
    }, 2000);
});

const o2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Player data is loaded");
    }, 1000);

    setTimeout(() => {
        reject("API disconnected");
    }, 1500);

});

const o3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Textures are downloaded and loaded");
    }, 3500);
});

o1.then(result => console.log(result), error => console.log("Error: " + error));
o2.then(result => console.log(result), error => console.log("Error: " + error));
o3.then(result => console.log(result), error => console.log("Error: " + error));

Promise.all([o1,o2,o3]).then(result => {
    console.log("Game loaded");
}).catch(error => console.log("error"));

// --------------------------------------------------------------------------------------------

const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "app",
    password: "app",
    database: "testing_platform"
});

function findUser(index){
    connection.promise().query(
        "SELECT * FROM student WHERE index_number = ?;",
        [index]
    ).then(
        showData
    ).catch(error => {
        console.log("Error: ", error);
    }).then(() => {
        connection.end();
    });
}

function showData([rows, fields]) {
    for(let row of rows){
        console.log(row.student_id, row.first_name);
    }
}

findUser(2020230210)

module.exports.findUser = findUser

// -----------------------------------------------------------------

const http = require("http");

const server = http.createServer(requestHandler);

function requestHandler(request, response){
    console.log("Request got!");
    const data = {
        method: request.method,
        url: request.url
    };

    const json = JSON.stringify(data);

    response.writeHead(200, {"Content-type": 'application/json; content=utf-8'});

    response.write(json);
    response.end();

}

server.listen(4000);


//---------------------------------------------------------------------------------------------------------------------------
console.log("Server running...");
const http = require("http");

const server = http.createServer(requestHandler);

async function requestHandler(request, response){
    let data = {};
    let good = false;
    if(request.method == "GET" && request.url === "/getRandomNumber/"){
        data = sendRandomNumber();
        good = true;
    } else if (request.method == "POST" && request.url == "/checkStudentInfo/"){
        data = checkStudentInfo(await extractBodyData(request));
        good = true;
    }else{
        good = false;
    }

    if(good){
        response.writeHead(200, {
            "Content-type": "application/json"
        });
        response.write(JSON.stringify(data));
    }else{
        response.writeHead(404);
    }

    response.end();
}

function sendRandomNumber(){
    let number = (Math.random() * 10000).toFixed(0);

    return {
        randomNumber: number
    };

}

function extractBodyData(request) {

    return new Promise( (resolve, reject) => {

        let parts = [];
        request.on("data", part => parts.push(part));
        request.on("end", () => {
            resolve(Buffer.concat(parts).toString());
        });

    });
}

function checkStudentInfo(data){
    let student = JSON.parse(data);

    if(student.name.length < 2){
        return {
            status: false,
            reason: "name"
        };
    }

    if(student.surname.length < 2){
        return {
            status: false,
            reason: "surname"
        };
    }

    if(student.index.length != 10){
        return {
            status: false,
            reason: "index"
        }
    }

    return {
        status: true
    }

}

server.listen(4000);


//---------------------------------------------------------------------------------------------------------

const express = require("express");

const app = express();

app.get("/", (request, response) => {
    let data = {
        ip: request.ip,
        parameters: request.params,
        query: request.query,
    };

    response.status(200);
    response.send(JSON.stringify(data));
});

app.get("/user/:name", (request, response) => {
    let name = request.params.name;
    response.status(200);
    response.send("user was: " + name);
});



console.log("Server started...");
app.listen(4000);