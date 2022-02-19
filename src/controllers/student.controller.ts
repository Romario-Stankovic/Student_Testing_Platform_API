import { Body, Controller, Delete, Get, HttpException, HttpStatus, Patch, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { APIResponse } from "src/misc/api.response";
import { AddStudentDTO, DeleteStudentDTO, UpdateStudentDTO } from "src/dtos/student.dto";
import { Student } from "src/entities/student.entity";
import { StudentService } from "src/services/student.service";
import { AllowToRoles } from "src/misc/allow.role.decorator";
import { RoleGuard } from "src/guards/role.guard";

@Controller("api/student/")
export class StudentController {
    constructor(
        private studentService: StudentService
    ) { }

    @UseGuards(RoleGuard)
    @AllowToRoles("administrator")
    @Get()
    async getStudent(@Query("by") by : string, @Query("id") id: number): Promise<Student | Student[] | APIResponse> {
        
        let student;

        if(by == "default"){
            student = await this.studentService.getByID(id);
        }else if(by == "all"){
            student = await this.studentService.getAll();
        }else{
            throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
        }
        
        if (student == null) {
            return new Promise(resolve => { resolve(APIResponse.NULL_ENTRY); });
        }

        return new Promise(resolve => { resolve(student); });

    }

    @UseGuards(RoleGuard)
    @AllowToRoles("administrator")
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

    @UseGuards(RoleGuard)
    @AllowToRoles("administrator")
    @Patch()
    async patchStudent(@Body() data: UpdateStudentDTO): Promise<APIResponse> {

        let student = await this.studentService.getByIndex(data.indexNumber);
        if (student != null && student.studentId != data.studentId) {
            return new Promise(resolve => { resolve(APIResponse.DUPLICATE_UNIQUE_VALUE); });
        }

        let dbstudent = await this.studentService.update(data.studentId, data.firstName, data.lastName, data.indexNumber);

        if (dbstudent == null) {
            return new Promise(resolve => { resolve(APIResponse.SAVE_FAILED); });
        }

        return new Promise(resolve => { resolve(APIResponse.OK); });

    }

    @UseGuards(RoleGuard)
    @AllowToRoles("administrator")
    @Delete()
    async deleteStudent(@Body() data : DeleteStudentDTO) : Promise<APIResponse> {

        let student = await this.studentService.delete(data.studentId);

        if(student == null){
            return new Promise(resolve => {resolve(APIResponse.DELETE_FAILED)});
        }

        return new Promise(resolve => {resolve(APIResponse.OK)});

    }

}