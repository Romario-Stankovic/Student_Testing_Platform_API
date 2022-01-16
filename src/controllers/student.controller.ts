import { Body, Controller, Get, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { APIResponse } from "src/misc/api.response";
import { AddStudentDTO, EditStudentDTO } from "src/dtos/student.dto";
import { Student } from "src/entities/student.entity";
import { StudentService } from "src/services/student.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { StorageConfiguration } from "src/configs/config";
import { diskStorage } from "multer";
import { validateIndexNumber, validateLastName, validateName } from "src/misc/validations";

@Controller("api/student/")
export class StudentController{
    constructor (
        private studentService : StudentService
    ) { }

    @Get()
    async getStudentWithIndex(@Query("index") index: string): Promise<Student | APIResponse> {
      let student = await this.studentService.getByIndex(index);
      if(student == null){
        return new Promise(resolve => {resolve(APIResponse.fromTemplate(APIResponse.NULL_ENTRY, "Not Found!"))});
      }

      return new Promise(resolve => {resolve(student)});

    }

    @Put()
    async putStudent(@Body() data: AddStudentDTO): Promise<APIResponse>{

      if(!validateName(data.firstName)){
        return new Promise(resolve => {resolve(APIResponse.fromTemplate(APIResponse.VALIDATION_FAILED, "Invalid firstName"))});
      }

      if(!validateLastName(data.lastName)){
        return new Promise(resolve => {resolve(APIResponse.fromTemplate(APIResponse.VALIDATION_FAILED, "Invalid lastName"))});
      }

      if(!validateIndexNumber(data.indexNumber)){
        return new Promise(resolve => {resolve(APIResponse.fromTemplate(APIResponse.VALIDATION_FAILED, "Invalid indexNumber"))});
      }

      let student = await this.studentService.getByIndex(data.indexNumber);
      if (student != null) {
        return new Promise(resolve => { resolve(APIResponse.fromTemplate(APIResponse.DUPLICATE_UNIQUE_VALUE, "Index number taken")) });
      }

      if(!(await this.studentService.add(data))){
        return new Promise(resolve => {resolve(APIResponse.fromTemplate(APIResponse.SAVE_FAILED, "Failed to save"))});
      }
      
      return new Promise(resolve => {resolve(APIResponse.fromTemplate(APIResponse.OK, "Student added successfully"))});
    }

    @Post()
    async postStudent(@Query("id") id : number, @Body() data: EditStudentDTO): Promise<APIResponse> {

      let student = await this.studentService.getByID(id);
      if(student == null){
        return new Promise(resolve => {resolve(APIResponse.fromTemplate(APIResponse.NULL_ENTRY, "Student does not exist"))});
      }

      if(!validateName(data.firstName)){
        return new Promise(resolve => {resolve(APIResponse.fromTemplate(APIResponse.VALIDATION_FAILED, "Invalid firstName"))});
      }

      if(!validateLastName(data.lastName)){
        return new Promise(resolve => {resolve(APIResponse.fromTemplate(APIResponse.VALIDATION_FAILED, "Invalid lastName"))});
      }

      if(!validateIndexNumber(data.indexNumber)){
        return new Promise(resolve => {resolve(APIResponse.fromTemplate(APIResponse.VALIDATION_FAILED, "Invalid indexNumber"))});
      }

      student = await this.studentService.getByIndex(data.indexNumber);
      if (student != null && student.studentId != id) {
        return new Promise(resolve => { resolve(APIResponse.fromTemplate(APIResponse.DUPLICATE_UNIQUE_VALUE, "Index number taken")) });
      }

      if(!(await this.studentService.editByID(id, data))){
        return new Promise(resolve => {resolve(APIResponse.fromTemplate(APIResponse.SAVE_FAILED, "Failed to save"))});
      }

      return new Promise(resolve => {resolve(APIResponse.fromTemplate(APIResponse.OK, "Student edited successfully"))});

    }

    @Post("uploadPhoto")
    @UseInterceptors(FileInterceptor(
      "image",
      {
        storage: diskStorage({
          destination: StorageConfiguration.image.destination,
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
          fileSize: StorageConfiguration.image.maxSize
        }
      }
    ))
    async uploadPhoto(@UploadedFile() image){
        console.log(image);
    }

}