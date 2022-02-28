import { Body, Controller, Delete, Get, HttpException, HttpStatus, Patch, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { APIResponse } from "src/misc/api.response";
import { PostProfessorDTO, DeleteProfessorDTO, PatchProfessorDTO } from "src/dtos/professor.dto";
import { Professor } from "src/entities/professor.entity";
import { ProfessorService } from "src/services/professor.service";
import { RoleGuard } from "src/guards/role.guard";
import { AllowToRoles } from "src/misc/allow.role.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { StorageConfiguration } from "src/configs/config";
import { imageFilter } from "src/misc/filters";
import * as path from "path";
import * as fs from "fs";

@Controller("api/professor/")

export class ProfessorController {
    constructor(
        private professorService: ProfessorService
    ) { }

    @UseGuards(RoleGuard)
    @AllowToRoles("administrator")
    @Get()
    async getProfessor(@Query("by") by: string, @Query("id") id: number): Promise<Professor | Professor[] | APIResponse> {
        let professor: Professor | Professor[];

        if (by == "default") {
            professor = await this.professorService.getByID(id);
        } else if (by == "all") {
            professor = await this.professorService.getAll();
        } else {
            throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
        }

        if (professor == null) {
            return new Promise(resolve => { resolve(APIResponse.NULL_ENTRY); });
        }

        return new Promise(resolve => { resolve(professor); });

    }

    @UseGuards(RoleGuard)
    @AllowToRoles("administrator")
    @Post()
    async postProfessor(@Body() data: PostProfessorDTO): Promise<Professor | APIResponse> {

        let professor = await this.professorService.getByUsername(data.username);

        if (professor != null) {
            return new Promise(resolve => { resolve(APIResponse.DUPLICATE_UNIQUE_VALUE); });
        }

        let postedProfessor = await this.professorService.add(data.firstName, data.lastName, data.username, data.password, null);

        if (postedProfessor == null) {
            return new Promise(resolve => { resolve(APIResponse.SAVE_FAILED); });
        }

        return new Promise(resolve => { resolve(postedProfessor); });

    }

    @UseGuards(RoleGuard)
    @AllowToRoles("administrator")
    @Patch()
    async patchProfessor(@Body() data: PatchProfessorDTO): Promise<APIResponse> {
        let professor = await this.professorService.getByUsername(data.username);

        if (professor != null && professor.professorId != data.professorId) {
            return new Promise(resolve => { resolve(APIResponse.DUPLICATE_UNIQUE_VALUE); });
        }

        let patchedProfessor = await this.professorService.update(data.professorId, data.firstName, data.lastName, data.username, data.password, null);

        if (patchedProfessor == null) {
            return new Promise(resolve => { resolve(APIResponse.SAVE_FAILED); });
        }

        return new Promise(resolve => { resolve(APIResponse.OK); });

    }

    @UseGuards(RoleGuard)
    @AllowToRoles("administrator")
    @Delete()
    async deleteProfessor(@Body() data: DeleteProfessorDTO): Promise<APIResponse> {

        let deletedProfessor = await this.professorService.delete(data.professorId);

        if (deletedProfessor == null) {
            return new Promise(resolve => { resolve(APIResponse.DELETE_FAILED); });
        }

        return new Promise(resolve => { resolve(APIResponse.OK); });

    }

    @UseGuards(RoleGuard)
    @AllowToRoles("administrator")
    @Post("image")
    @UseInterceptors(FileInterceptor("image", {
        storage: diskStorage({
            destination: StorageConfiguration.mainDestination + "images/professors/",
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
    async postProfessorImage(@UploadedFile() file: Express.Multer.File, @Query("id") id: number): Promise<APIResponse> {
        let professor = await this.professorService.getByID(id);
        if (professor == null) {
            return new Promise(resolve => { resolve(APIResponse.NULL_ENTRY); });
        }

        if (file == undefined) {
            return new Promise(resolve => { resolve(APIResponse.ASSET_SAVE_FAILED); });
        }

        let ext = path.extname(file.filename);
        let filePath = file.destination + "/";
        let oldName = file.filename;
        let newName = professor.username + ext;
        try {
            fs.rename(filePath + oldName, filePath + newName, error => { if (error) { throw error; } });
        } catch (error) {
            return new Promise(resolve => { resolve(APIResponse.ASSET_SAVE_FAILED); });
        }

        let updatedProfessor = await this.professorService.update(professor.professorId, null, null, null, null, newName);

        if (updatedProfessor == null) {
            return new Promise(resolve => { resolve(APIResponse.SAVE_FAILED); });
        }

        return new Promise(resolve => { resolve(APIResponse.OK); });

    }

}