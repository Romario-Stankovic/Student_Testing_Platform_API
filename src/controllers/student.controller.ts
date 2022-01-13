import { Body, Controller, Get, Post, Put, Query } from "@nestjs/common";
import { APIResponse } from "src/api.response";
import { AddStudentDTO, EditStudentDTO } from "src/dtos/student.dto";
import { Student } from "src/entities/student.entity";
import { StudentService } from "src/services/student.service";

@Controller()
export class StudentController{
    constructor (
        private studentService : StudentService
    ) { }

    @Get("api/student/")
    getStudentWithIndex(@Query("index") index: number): Promise<Student | APIResponse> {
      return this.studentService.getByIndex(index);
    }

    @Put("api/student/")
    putStudent(@Body() data: AddStudentDTO): Promise<Student | APIResponse>{
      return this.studentService.add(data);
    }

    @Post("api/student/")
    postStudent(@Query("id") id : number, @Body() data: EditStudentDTO): Promise<Student | APIResponse> {
      return this.studentService.editByID(id, data);
    }

}