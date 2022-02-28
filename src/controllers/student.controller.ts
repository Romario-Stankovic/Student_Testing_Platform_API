import { Body, Controller, Delete, Get, HttpException, HttpStatus, Patch, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { APIResponse } from "src/misc/api.response";
import { PostStudentDTO, DeleteStudentDTO, PatchStudentDTO } from "src/dtos/student.dto";
import { Student } from "src/entities/student.entity";
import { StudentService } from "src/services/student.service";
import { AllowToRoles } from "src/misc/allow.role.decorator";
import { RoleGuard } from "src/guards/role.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { StorageConfiguration } from "src/configs/config";
import { diskStorage, Multer } from "multer";
import { imageFilter } from "src/misc/filters";
import * as path from "path";
import * as fs from "fs";

@Controller("api/student/")
export class StudentController {
    constructor(
        private studentService: StudentService
    ) { }

    @UseGuards(RoleGuard)
    @AllowToRoles("administrator")
    @Get()
    async getStudent(@Query("by") by: string, @Query("id") id: number): Promise<Student | Student[] | APIResponse> {

        let student: Student | Student[];

        if (by == "default") {
            student = await this.studentService.getByID(id);
        } else if (by == "all") {
            student = await this.studentService.getAll();
        } else {
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
    async postStudent(@Body() data: PostStudentDTO): Promise<Student | APIResponse> {

        let student = await this.studentService.getByIndex(data.indexNumber);

        if (student != null) {
            return new Promise(resolve => { resolve(APIResponse.DUPLICATE_UNIQUE_VALUE); });
        }

        let postedStudent = await this.studentService.add(data.firstName, data.lastName, data.indexNumber, null);

        if (postedStudent == null) {
            return new Promise(resolve => { resolve(APIResponse.SAVE_FAILED); });
        }

        return new Promise(resolve => { resolve(postedStudent); });
    }

    @UseGuards(RoleGuard)
    @AllowToRoles("administrator")
    @Patch()
    async patchStudent(@Body() data: PatchStudentDTO): Promise<APIResponse> {

        let student = await this.studentService.getByIndex(data.indexNumber);
        if (student != null && student.studentId != data.studentId) {
            return new Promise(resolve => { resolve(APIResponse.DUPLICATE_UNIQUE_VALUE); });
        }

        let patchedStudent = await this.studentService.update(data.studentId, data.firstName, data.lastName, data.indexNumber, null);

        if (patchedStudent == null) {
            return new Promise(resolve => { resolve(APIResponse.SAVE_FAILED); });
        }

        return new Promise(resolve => { resolve(APIResponse.OK); });

    }

    @UseGuards(RoleGuard)
    @AllowToRoles("administrator")
    @Delete()
    async deleteStudent(@Body() data: DeleteStudentDTO): Promise<APIResponse> {

        let deletedStudent = await this.studentService.delete(data.studentId);

        if (deletedStudent == null) {
            return new Promise(resolve => { resolve(APIResponse.DELETE_FAILED); });
        }

        return new Promise(resolve => { resolve(APIResponse.OK); });

    }

    @UseGuards(RoleGuard)
    @AllowToRoles("administrator")
    @Post("image")
    @UseInterceptors(FileInterceptor("image", {
        storage: diskStorage({
            destination: StorageConfiguration.mainDestination + "images/students/",
            filename: (request, file, callback) => {
                let ext = path.extname(file.originalname);
                let randomPart = new Array(10).fill(0).map(e => (Math.random() * 9).toFixed(0).toString()).join("");
                let name = "temp_" + randomPart + ext;
                callback(null, name);
            }
        }),
        fileFilter: imageFilter,
        limits: {
            files: 1,
            fileSize: StorageConfiguration.images.maxSize
        }
    }))
    async postStudentImage(@UploadedFile() file: Express.Multer.File, @Query("id") id: number): Promise<APIResponse> {

        let student = await this.studentService.getByID(id);

        if (student == null) {
            return new Promise(resolve => { resolve(APIResponse.NULL_ENTRY); });
        }

        if (file == undefined) {
            return new Promise(resolve => { resolve(APIResponse.ASSET_SAVE_FAILED); });
        }

        let ext = path.extname(file.filename);
        let filePath = file.destination + "/";
        let oldName = file.filename;
        let newName = student.indexNumber + ext;
        try {
            fs.rename(filePath + oldName, filePath + newName, error => { if (error) { throw error; } });
        } catch (error) {
            return new Promise(resolve => { resolve(APIResponse.ASSET_SAVE_FAILED); });
        }

        let updatedStudent = await this.studentService.update(student.studentId, null, null, null, newName);

        if (updatedStudent == null) {
            return new Promise(resolve => { resolve(APIResponse.SAVE_FAILED); });
        }

        return new Promise(resolve => { resolve(APIResponse.OK); });

    }

}