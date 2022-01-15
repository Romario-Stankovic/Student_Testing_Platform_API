import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddStudentDTO, EditStudentDTO } from 'src/dtos/student.dto';
import { Student } from 'src/entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private readonly student: Repository<Student>
    ) { }

    async getByID(id: number): Promise<Student | null> {

        let student = await this.student.findOne(id);

        if(student == undefined) {
            return new Promise(resolve => {resolve(null)});
        }

        return new Promise(resolve => {resolve(student)});

    }

    async getByIndex(index: string): Promise<Student | null> {

        let student = await this.student.findOne({where: {indexNumber : index}});

        if(student == undefined){
            return new Promise(resolve => {resolve(null)});
        }

        return new Promise(resolve => {resolve(student)});
    }

    add(data: AddStudentDTO): Promise<boolean> {
        
        let newStudent = new Student();
        newStudent.firstName = data.firstName;
        newStudent.lastName = data.lastName;
        newStudent.indexNumber = data.indexNumber;
        newStudent.imagePath = null;

        try {
            this.student.save(newStudent);
            return new Promise(resolve => {resolve(true)});
        }catch(error){
            return new Promise(resolve => {resolve(false)});
        }

    }

    async editByID(id: number, data: EditStudentDTO): Promise<boolean> {
        let student = await this.getByID(id);

        if (student == null) {
            return new Promise(resolve => {resolve(false)});
        }

        student.firstName = data.firstName;
        student.lastName = data.lastName;
        student.indexNumber = data.indexNumber;
        student.imagePath = null;

        try {
            this.student.save(student);
            return new Promise(resolve => {resolve(true)});
        }catch(error){
            return new Promise(resolve => {resolve(false)});
        }

    }

}