# Description

A RESTful API developed using NestJS and TypeScript. It was given as a school project to learn web application development.

Project requirements were:
- Use a relational database
- Created using Node.js
- Frontend application
- 3 Levels of validation
- Project documentation

# Languages & Tools:
<p>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width=25 alt="TypeScript">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width=25  alt="Node.js">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg" width=25 alt="NestJs">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" width=25 alt="MySQL">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg" width=25 alt="Docker">
</p>

# Quick Start - Manual

1. Install Node.js [link](https://nodejs.org/en/)
2. Clone the repository on your local machine
3. Host the MySQL database provided in the ./database folder on your local machine
4. Create a new user to manage your database (*optional)
5. Create a `.env` file in the project directory and set the following parameters to match your mysql configuration:
```
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_DATABASE=student_testing_platform
```
6. Open a terminal in the directory of the project
7. Execute the following commands:
```
> npm install
> npm run start
```
6. Enjoy :)

# Quick Start - Docker

1. Install Docker [link](https://www.docker.com/get-started)
2. Download or copy-paste the docker-compose.yml file from the repository into any directory on your local machine
3. Open a terminal in the directory where the file lives
4. Run `docker-compose up` to start composing the containers
5. Enjoy :)

# Documentation

- [API Responses](docs/API_Responses.md)
- [Authentication Controller](docs/Authentication_Controller.md)
- [Administrator Controller](docs/Administrator_Controller.md)
- [Professor Controller](docs/Professor_Controller.md)
- [Student Controller](docs/Student_Controller.md)
- [Test Controller](docs/Test_Controller.md)
- [Work Controller](docs/Work_Controller.md)
