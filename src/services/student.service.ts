import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student) 
        private readonly student: Repository<Student>
    ) {}

    getAll(): Promise<Student[]> {
        // Return all records
        return this.student.find();
    }

    getById(id: number): Promise<Student> {
        return this.student.findOne(id);
    }

}