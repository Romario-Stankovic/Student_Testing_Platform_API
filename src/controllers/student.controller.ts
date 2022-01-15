import { Body, Controller, Get, Post, Put, Query } from "@nestjs/common";
import { APIResponse } from "src/misc/api.response";
import { AddStudentDTO, EditStudentDTO } from "src/dtos/student.dto";
import { Student } from "src/entities/student.entity";
import { StudentService } from "src/services/student.service";

@Controller("api/student/")
export class StudentController{
    constructor (
        private studentService : StudentService
    ) { }

    @Get()
    async getStudentWithIndex(@Query("index") index: string): Promise<Student | APIResponse> {
      let student = await this.studentService.getByIndex(index);
      if(student == null){
        return new Promise(resolve => {resolve(new APIResponse("Error", 2001, "Not found"))})
      }

      return new Promise(resolve => {resolve(student)});

    }

    @Put()
    async putStudent(@Body() data: AddStudentDTO): Promise<APIResponse>{

      if(data.firstName == null || data.firstName.length == 0){
        return new Promise(resolve => {resolve(new APIResponse("Error", 2002, "First name not valid"))});
      }

      if(data.lastName == null || data.lastName.length == 0){
        return new Promise(resolve => {resolve(new APIResponse("Error", 2002, "Last name not valid"))});
      }

      if(data.indexNumber == null || data.indexNumber.length != 10 || isNaN(Number.parseInt(data.indexNumber))){
        return new Promise(resolve => {resolve(new APIResponse("Error", 2002, "Index number not valid"))});
      }

      let student = await this.studentService.getByIndex(data.indexNumber);
      if (student != null) {
        return new Promise(resolve => { resolve(new APIResponse("Error", 2003, "Index already exists")) });
      }

      if(!(await this.studentService.add(data))){
        return new Promise(resolve => {resolve(new APIResponse("Error", 1001, "Failed to save"))});
      }
      
      return new Promise(resolve => {resolve(new APIResponse("OK!", 0, "Student added successfully"))});
    }

    @Post()
    async postStudent(@Query("id") id : number, @Body() data: EditStudentDTO): Promise<APIResponse> {

      if(data.firstName == null || data.firstName.length == 0){
        return new Promise(resolve => {resolve(new APIResponse("Error", 2002, "First name not valid"))});
      }

      if(data.lastName == null || data.lastName.length == 0){
        return new Promise(resolve => {resolve(new APIResponse("Error", 2002, "Last name not valid"))});
      }

      if(data.indexNumber == null || data.indexNumber.length != 10 || isNaN(Number.parseInt(data.indexNumber))){
        return new Promise(resolve => {resolve(new APIResponse("Error", 2002, "Index number not valid"))});
      }

      let student = await this.studentService.getByIndex(data.indexNumber);
      if (student != null && student.studentId != id) {
        return new Promise(resolve => { resolve(new APIResponse("Error", 2003, "Index already exists")) });
      }

      if(!(await this.studentService.editByID(id, data))){
        return new Promise(resolve => {resolve(new APIResponse("Error", 1001))});
      }

      return new Promise(resolve => {resolve(new APIResponse("OK!", 0, "Edit Successful"))});

    }

}