import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APIResponse } from 'src/api.response';
import { AddStudentDTO, EditStudentDTO } from 'src/dtos/student.dto';
import { Student } from 'src/entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private readonly student: Repository<Student>
    ) { }

    getByID(id: number): Promise<Student | APIResponse> {

        return new Promise(async (resolve) => {
            let student = await this.student.findOne(id);
            if(student == null){
                resolve(new APIResponse("Error", -1001));
            }
            resolve(student);
        });

    }

    getByIndex(index: number): Promise<Student | APIResponse> {

        return new Promise(async (resolve) => {
            let student = await this.student.findOne({ where: { indexNumber: index } });
            if (student == null) {
                resolve(new APIResponse("Error", -1001));
            }
            resolve(student);
        });
    }

    add(data: AddStudentDTO): Promise<Student | APIResponse> {
        let newStudent: Student = new Student();
        newStudent.firstName = data.firstName;
        newStudent.lastName = data.lastName;
        newStudent.indexNumber = data.index;
        newStudent.imagePath = data.imagePath;

        return new Promise((resolve) => {
            this.student.save(newStudent)
                .then(data => resolve(data)) // Return data of newly created student
                .catch(error => { // Catch an error
                    let resp: APIResponse = new APIResponse("Error", -1002);
                    resolve(resp);
                });
        });

    }

    async editByID(id: number, data: EditStudentDTO): Promise<Student | APIResponse> {
        let student: Student = await this.student.findOne(id);

        if (student == null) {
            return new Promise((resolve) => resolve(new APIResponse("Error", -1001)));
        }

        student.firstName = data.firstName;
        student.lastName = data.lastName;

        return this.student.save(student);
    }

}