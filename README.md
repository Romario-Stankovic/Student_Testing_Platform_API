<h1 align="center">Student Testing Platform API</h1>

A Rest API developed using the NestJS framework. This API was developed as part of a school project designed to learn the fundamentals of RESTful APIs and how they operate.

## 🧰 Languages & Tools
<p>
  <a href="https://code.visualstudio.com/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" width="30px" alt="VSCode"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="30px" alt="TypeScript"></a>
  <a href="https://nodejs.org/en/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="30px" alt="Node.js"></a>
  <a href="https://nestjs.com/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg" width="30px" alt="NestJS"></a>
  <a href="https://www.mysql.com/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" width="30px" alt="MySQL"></a>
  <a href="https://www.docker.com/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg" width="30px" alt="Docker"></a>
</p>

## ⚡ Getting Started

Requirements:

- [Node.js](https://nodejs.org/en/)
- [MySQL Server](https://www.mysql.com/)

Guide:

  1. Install Node.js and MySQL Server
  2. Clone the repository on to your machine
  3. Host the MySQL database provided in the /database folder
  4. Create a new user to manage the database (*optional)
  5. Modify the .env file in the project directory to match your MySQL settings.
  
  ```
  MYSQL_HOST=localhost
  MYSQL_PORT=3306
  MYSQL_USER=root
  MYSQL_PASSWORD=root
  MYSQL_DATABASE=student_testing_platform
  ```
  6. Open a terminal window in the directory of the project
  7. Execute the following commands:

  ```
  > npm install
  > npm run start
  ```
  
  8. Enjoy :)

## ⚡ Getting Started - Docker

Requirements:

- [Docker](https://www.docker.com/)

Guide:

1. Install Docker
2. Download or copy/paste the `docker-compose.yml` file from the repository into any directory on your local machine
3. Open a terminal window in the same directory as the compose file
4. Run `docker-compose up` to start composing the containers
5. Enjoy

## 📚 Documentation

- [API Responses](docs/API_Responses.md)
- [Authentication Controller](docs/Authentication_Controller.md)
- [Administrator Controller](docs/Administrator_Controller.md)
- [Professor Controller](docs/Professor_Controller.md)
- [Student Controller](docs/Student_Controller.md)
- [Test Controller](docs/Test_Controller.md)
- [Work Controller](docs/Work_Controller.md)

## ⚖ License
This repository is under the [MIT](LICENCE) license.
