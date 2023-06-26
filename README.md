<h1 align="center">Student Testing Platform API</h1>

"Student Testing Platform" was a side project given as a practical task at Singidunum University. The project was given as a opportunity to learn full stack development using NodeJS. The project features a basic frontend that is build using vanilla HTML, CSS, and JavaScript, while the backend was developed using NestJS and TypeScript.

The project is split into two repositories:

- [Frontend](https://github.com/Romario-Stankovic/StudentTestingPlatform)
- [Backend](https://github.com/Romario-Stankovic/StudentTestingPlatform_API)

## 💡 Features

The backend allows for CRUD operations over the following tables:

- Administrators
- Answers
- Professors
- Questions
- Students
- Tests
- Works
- Work Answers

## 🧰 Languages & Tools

  <a href="https://code.visualstudio.com/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" width="30px" alt="VSCode" title="Visual Studio Code"></a>
  <a href="https://nodejs.org/en/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="30px" alt="NodeJS" title="NodeJS"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="30px" alt="TypeScript" title="TypeScript"></a>
  <a href="https://nestjs.com/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg" width="30px" alt="NestJS" title="NestJS"></a>
  <a href="https://www.mysql.com/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" width="30px" alt="MySQL" title="MySQL"></a>
  <a href="https://www.docker.com/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg" width="30px" alt="Docker" title="Docker"></a>

## ⚡ Getting Started

### 🛠 Requirements:

- [NodeJS](https://nodejs.org/en/)
- [MySQL Server](https://www.mysql.com/)

### 📖 Guide:

  1. Download and install NodeJS and MySQL Server
  2. Download the repository
  3. Execute ```./database/testing_platform_empty.sql``` to load the database
  4. Create a new user to manage the database (*optional)
  5. Modify the .env file in the project directory to match your MySQL settings:
  ```
  MYSQL_HOST=localhost
  MYSQL_PORT=3306
  MYSQL_USER=root
  MYSQL_PASSWORD=root
  MYSQL_DATABASE=student_testing_platform
  ```
  6. Execute ```> npm install``` to install necessary packages
  7. Execute ```> npm run start``` to run the code
  8. Enjoy 🙂

## ⚡ Getting Started - Docker

### 🛠 Requirements:

- [Docker](https://www.docker.com/)

### 📖 Guide:

1. Download and Install Docker
2. Download or copy/paste the ```docker-compose.yml``` file from the repository into any directory on your local machine
3. Execute ```> docker-compose up``` to start composing the containers
4. Enjoy 🙂

## 📚 Documentation

- [API Responses](docs/API_Responses.md)
- [Authentication Controller](docs/Authentication_Controller.md)
- [Administrator Controller](docs/Administrator_Controller.md)
- [Professor Controller](docs/Professor_Controller.md)
- [Student Controller](docs/Student_Controller.md)
- [Test Controller](docs/Test_Controller.md)
- [Work Controller](docs/Work_Controller.md)

## ⚖ License
This repository is under the [MIT](LICENSE) license.
