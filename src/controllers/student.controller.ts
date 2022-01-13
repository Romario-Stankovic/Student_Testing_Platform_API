import { Body, Controller, Get, Post, Put, Query } from "@nestjs/common";
import { APIResponse } from "src/api.response";
import { AddStudentDTO, EditStudentDTO } from "src/dtos/student.dto";
import { Student } from "src/entities/student.entity";
import { StudentService } from "src/services/student.service";

@Controller("api/student/")
export class StudentController{
    constructor (
        private studentService : StudentService
    ) { }

    @Get()
    getStudentWithIndex(@Query("index") index: number): Promise<Student | APIResponse> {
      return this.studentService.getByIndex(index);
    }

    @Put()
    putStudent(@Body() data: AddStudentDTO): Promise<Student | APIResponse>{
      return this.studentService.add(data);
    }

    @Post()
    postStudent(@Query("id") id : number, @Body() data: EditStudentDTO): Promise<Student | APIResponse> {
      return this.studentService.editByID(id, data);
    }

}