import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from './configs/config';
import { AppController } from './controllers/app.controller';
import { Student } from './entities/student.entity';
import { StudentService } from './services/student.service';
import { Professor } from './entities/professor.entity';
import { ProfessorService } from './services/professor.service';
import { Question } from './entities/question.entity';
import { Work } from './entities/work.entity';
import { WorkAnswer } from './entities/workAnswer.entity';
import { Test } from './entities/test.entity';
import { Answer } from './entities/answer.entity';
import { StudentController } from './controllers/student.controller';
import { ProfessorController } from './controllers/professor.controller';
import { Administrator } from './entities/administrator.entity';
import { AdministratorController } from './controllers/administrator.controller';
import { AdministratorService } from './services/administrator.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: "mysql",
    host: DatabaseConfiguration.hostname,
    port: DatabaseConfiguration.port,
    username: DatabaseConfiguration.username,
    password: DatabaseConfiguration.password,
    database: DatabaseConfiguration.database,
    entities: [
      Administrator,
      Answer,
      Professor,
      Question,
      Student,
      Test,
      Work,
      WorkAnswer
    ]
  }),
  TypeOrmModule.forFeature([
    Student,
    Professor,
    Administrator
  ])
  ],
  controllers: [AppController, AuthController, StudentController, ProfessorController, AdministratorController],
  providers: [StudentService, ProfessorService, AdministratorService],
})
export class AppModule { }
