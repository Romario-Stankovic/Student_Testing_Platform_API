import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from './configs/database.config';
import { AppController } from './app.controller';
import { Student } from './entities/student.entity';
import { StudentService } from './services/student.service';
import { Professor } from './entities/professor.entity';
import { ProfessorService } from './services/professor.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: DatabaseConfiguration.hostname,
    port: DatabaseConfiguration.port,
    username: DatabaseConfiguration.username,
    password: DatabaseConfiguration.password,
    database: DatabaseConfiguration.database,
    entities: [ Student, Professor]
  }),
  TypeOrmModule.forFeature([ Student, Professor])
  ],
  controllers: [AppController],
  providers: [StudentService, ProfessorService],
})
export class AppModule { }
