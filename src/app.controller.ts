import { Controller, Get } from '@nestjs/common';
import { Professor } from './entities/professor.entity';
import { Student } from './entities/student.entity';
import { ProfessorService } from './services/professor.service';
import { StudentService } from './services/student.service';

@Controller()
export class AppController {

  constructor(
    private studentService : StudentService,
    private professorService: ProfessorService
  ){}

  @Get("api/student/")
  getAllStudents(): Promise<Student[]>{
    return this.studentService.getAll();
  }

  @Get("api/professor/")
  getAllProfessors(): Promise<Professor[]>{
    return this.professorService.getAll();
  }

}
