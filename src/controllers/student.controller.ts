import { Body, Controller, Get, Patch, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { APIResponse } from "src/misc/api.response";
import { AddStudentDTO, UpdateStudentDTO } from "src/dtos/student.dto";
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

    @Post()
    async postStudent(@Body() data: AddStudentDTO): Promise<Student | APIResponse> {

        let student = await this.studentService.getByIndex(data.indexNumber);
        if (student != null) {
            return new Promise(resolve => { resolve(APIResponse.DUPLICATE_UNIQUE_VALUE); });
        }

        let dbstudent = await this.studentService.add(data.firstName, data.lastName, data.indexNumber, null);

        if (dbstudent == null) {
            return new Promise(resolve => { resolve(APIResponse.SAVE_FAILED); });
        }

        return new Promise(resolve => { resolve(dbstudent); });
    }

    @Patch()
    async patchStudent(@Query("id") id: number, @Body() data: UpdateStudentDTO): Promise<APIResponse> {

        let student = await this.studentService.getByIndex(data.indexNumber);
        if (student != null && student.studentId != id) {
            return new Promise(resolve => { resolve(APIResponse.DUPLICATE_UNIQUE_VALUE); });
        }

        let dbstudent = await this.studentService.update(id, data.firstName, data.lastName, data.indexNumber);

        if (dbstudent == null) {
            return new Promise(resolve => { resolve(APIResponse.SAVE_FAILED); });
        }

        return new Promise(resolve => { resolve(APIResponse.OK); });

    }

}