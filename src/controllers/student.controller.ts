import { Body, Controller, Get, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { APIResponse } from "src/misc/api.response";
import { AddStudentDTO, EditStudentDTO } from "src/dtos/student.dto";
import { Student } from "src/entities/student.entity";
import { StudentService } from "src/services/student.service";

@Controller("api/student/")
export class StudentController {
    constructor(
        private studentService: StudentService
    ) { }

    @Get()
    async getStudentWithIndex(@Query("index") index: string): Promise<Student | APIResponse> {
        let student = await this.studentService.getByIndex(index);
        if (student == null) {
            return new Promise(resolve => { resolve(APIResponse.NULL_ENTRY); });
        }

        return new Promise(resolve => { resolve(student); });

    }

    @Put()
    async putStudent(@Body() data: AddStudentDTO): Promise<APIResponse> {

        let student = await this.studentService.getByIndex(data.indexNumber);
        if (student != null) {
            return new Promise(resolve => { resolve(APIResponse.DUPLICATE_UNIQUE_VALUE); });
        }

        if (!(await this.studentService.add(data))) {
            return new Promise(resolve => { resolve(APIResponse.SAVE_FAILED); });
        }

        return new Promise(resolve => { resolve(APIResponse.OK); });
    }

    @Post()
    async postStudent(@Query("id") id: number, @Body() data: EditStudentDTO): Promise<APIResponse> {

        let student = await this.studentService.getByID(id);
        if (student == null) {
            return new Promise(resolve => { resolve(APIResponse.NULL_ENTRY); });
        }

        student = await this.studentService.getByIndex(data.indexNumber);
        if (student != null && student.studentId != id) {
            return new Promise(resolve => { resolve(APIResponse.DUPLICATE_UNIQUE_VALUE); });
        }

        if (!(await this.studentService.editByID(id, data))) {
            return new Promise(resolve => { resolve(APIResponse.SAVE_FAILED); });
        }

        return new Promise(resolve => { resolve(APIResponse.OK); });

    }

}