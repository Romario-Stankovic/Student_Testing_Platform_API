import { Body, Controller, Get, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { APIResponse } from "src/misc/api.response";
import { AddStudentDTO, EditStudentDTO } from "src/dtos/student.dto";
import { Student } from "src/entities/student.entity";
import { StudentService } from "src/services/student.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { StorageConfiguration } from "src/configs/config";
import { diskStorage } from "multer";

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

      let student = await this.studentService.getByID(id);
      if(student == null){
        return new Promise(resolve => {resolve(new APIResponse("Error", 2001, "Student does not exist"))});
      }

      if(data.firstName == null || data.firstName.length == 0){
        return new Promise(resolve => {resolve(new APIResponse("Error", 2002, "First name not valid"))});
      }

      if(data.lastName == null || data.lastName.length == 0){
        return new Promise(resolve => {resolve(new APIResponse("Error", 2002, "Last name not valid"))});
      }

      if(data.indexNumber == null || data.indexNumber.length != 10 || isNaN(Number.parseInt(data.indexNumber))){
        return new Promise(resolve => {resolve(new APIResponse("Error", 2002, "Index number not valid"))});
      }

      student = await this.studentService.getByIndex(data.indexNumber);
      if (student != null && student.studentId != id) {
        return new Promise(resolve => { resolve(new APIResponse("Error", 2003, "Index already exists")) });
      }

      if(!(await this.studentService.editByID(id, data))){
        return new Promise(resolve => {resolve(new APIResponse("Error", 1001))});
      }

      return new Promise(resolve => {resolve(new APIResponse("OK!", 0, "Edit Successful"))});

    }

    @Post("uploadPhoto")
    @UseInterceptors(FileInterceptor(
      "image",
      {
        storage: diskStorage({
          destination: StorageConfiguration.images,
          filename: (request, file, callback) => {
            let originalName: string = file.originalname;
            let normalizedName = originalName.replace(/\s+/g, "-");
            let now = new Date();
  
            let datePart = "";
            let radnomPart = "";
  
            datePart += now.getFullYear().toString() + (now.getMonth() + 1).toString() + now.getDate().toString();
            radnomPart = new Array(10).fill(0).map(e => (Math.random() * 9).toFixed(0).toString()).join("");
  
            let fileName = datePart + "-" + radnomPart + "-" + normalizedName;
            callback(null, fileName);
            
          }
        }),
        fileFilter: (request, file, callback) => {
          if(!file.originalname.match(/\.(jpg|png)$/)){
            callback(new Error("Wrong file format"), false);
            return;
          }

          if(!(file.mimetype.includes("jpeg") || file.mimetype.includes("png"))){
            callback(new Error("Bad content"), false);
            return;
          }

          callback(null, true);

        },
        limits: {
          files: 1,
          fieldSize: StorageConfiguration.maxImageSize
        }
      }
    ))
    uploadPhoto(@UploadedFile() image : Express.Multer.File){
        console.log(image.filename);
    }

}