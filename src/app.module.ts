import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { AuthenticationMiddleware } from './middlewares/auth.middleware';
import { QuestionController } from './controllers/question.controller';
import { QuestionService } from './services/question.service';
import { Token } from './entities/token.entity';
import { TokenService } from './services/token.service';

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
      WorkAnswer,
      Token
    ]
  }),
  TypeOrmModule.forFeature([
    Student,
    Professor,
    Administrator,
    Question,
    Answer,
    Token
  ])
  ],
  controllers: [AppController, AuthController, StudentController, ProfessorController, AdministratorController, QuestionController],
  providers: [StudentService, ProfessorService, AdministratorService, QuestionService, TokenService],
  exports: [AdministratorService]
})
export class AppModule implements NestModule {
  
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware)
    .exclude("auth/*")
    .forRoutes("api/*")
  }
  
}
