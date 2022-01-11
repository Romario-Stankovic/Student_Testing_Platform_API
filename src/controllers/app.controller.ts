import { Controller, Get, Param, Query } from '@nestjs/common';
import { Professor } from '../entities/professor.entity';
import { ProfessorService } from '../services/professor.service';
import { StudentService } from '../services/student.service';

@Controller()
export class AppController {

  constructor(
  ) { }

}
