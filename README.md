<h1 align="center">Student Testing Platform API</h1>

<p>A Rest API developed using the NestJS framework. This API was developed as part of a school project designed to learn the fundamentals of RESTful APIs and how they operate.</p>

<h2>🧰 Languages & Tools</h2>
<p>
  <a href="https://code.visualstudio.com/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" width="30px" alt="VSCode"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="30px" alt="TypeScript"></a>
  <a href="https://nodejs.org/en/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="30px" alt="Node.js"></a>
  <a href="https://nestjs.com/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg" width="30px" alt="NestJS"></a>
  <a href="https://www.mysql.com/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" width="30px" alt="MySQL"></a>
  <a href="https://www.docker.com/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg" width="30px" alt="Docker"></a>
</p>

<h2>⚡ Getting Started</h2>

<p>Requirements:</p>

<ul>
<li><a href="https://nodejs.org/en/">Node.js</a></li>
<li><a href="https://www.mysql.com/">MySQL Server</a></li>
</ul>

<p>Guide:</p>

<ol>
  <li>Install Node.js and MySQL Server</li>
  <li>Clone the repository on to your machine</li>
  <li>Host the MySQL database provided in the /database folder</li>
  <li>Create a new user to manage the database (*optional)</li>
  <li>Modify the .env file in the project directory to match your MySQL settings.
  
  <br>

  Template:
  ```
  MYSQL_HOST=localhost
  MYSQL_PORT=3306
  MYSQL_USER=root
  MYSQL_PASSWORD=root
  MYSQL_DATABASE=student_testing_platform
  ```
  </li>
  <li>Open a terminal window in the directory of the project</li>
  <li>Execute

  ```
  > npm install
  > npm run start
  ```

  </li>
  <li>Enjoy :)</li>
</ol>

<h2>⚡ Getting Started - Docker</h2>

<p>Requirements:</p>

<ul>
<li> <a href="https://www.docker.com/">Docker</a> </li>
</ul>

<p>Guide: </p>

<ol>
<li>Install Docker</li>
<li>

Download or copy/paste the `docker-compose.yml` file from the repository into any directory on your local machine

</li>

<li>Open a terminal window in the same directory as the compose file</li>
<li>

Run `docker-compose up` to start composing the containers

</li>

<li>Enjoy</li>
</ol>

<h2>📚 Documentation</h2>

<ul>
  <li><a href="docs/API_Responses.md">API Responses</a></li>
  <li><a href="docs/Authentication_Controller.md">Authentication Controller</a></li>
  <li><a href="docs/Administrator_Controller.md">Administrator Controller</a></li>
  <li><a href="docs/Professor_Controller.md">Professor Controller</a></li>
  <li><a href="docs/Student_Controller.md">Student Controller</a></li>
  <li><a href="docs/Test_Controller.md">Test Controller</a></li>
  <li><a href="docs/Work_Controller.md">Work Controller</a></li>
</ul>

<h2>⚖ License</h2>
This repository is under the <a href="LICENSE.md">MIT</a> license.