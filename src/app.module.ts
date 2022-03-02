import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { QuestionService } from './services/question.service';
import { Token } from './entities/token.entity';
import { TokenService } from './services/token.service';
import { TestController } from './controllers/test.controller';
import { TestService } from './services/test.service';
import { AnswerService } from './services/answer.service';
import { WorkService } from './services/work.service';
import { WorkController } from './controllers/work.controller';
import { WorkAnswerService } from './services/workAnswer.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: "mysql",
            host: process.env.MYSQL_HOST || "localhost",
            port: Number.parseInt(process.env.MYSQL_PORT) || 3306,
            username: process.env.MYSQL_USER || "app",
            password: process.env.MYSQL_PASSWORD || "app",
            database: process.env.MYSQL_DATABASE || "student_testing_platform",
            entities: [
                Administrator,
                Answer,
                Professor,
                Question,
                Student,
                Test,
                Token,
                Work,
                WorkAnswer
            ]
        }),
        TypeOrmModule.forFeature([
            Administrator,
            Answer,
            Professor,
            Question,
            Student,
            Test,
            Token,
            Work,
            WorkAnswer
        ]),
        MulterModule.register({ dest: "./storage" })
    ],
    controllers: [
        AdministratorController,
        AuthController,
        ProfessorController,
        StudentController,
        TestController,
        WorkController
    ],
    providers: [
        AdministratorService,
        AnswerService,
        ProfessorService,
        QuestionService,
        StudentService,
        TestService,
        TokenService,
        WorkService,
        WorkAnswerService
    ]
})
export class AppModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthenticationMiddleware)
            .exclude("auth/*")
            .forRoutes("api/*", "auth/token/identity");
    }

}
