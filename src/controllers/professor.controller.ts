import { Body, Controller, Delete, Get, HttpException, HttpStatus, Patch, Post, Put, Query, UseGuards } from "@nestjs/common";
import { APIResponse } from "src/misc/api.response";
import { AddProfessorDTO, DeleteProfessorDTO, UpdateProfessorDTO } from "src/dtos/professor.dto";
import { Professor } from "src/entities/professor.entity";
import { ProfessorService } from "src/services/professor.service";
import { RoleGuard } from "src/guards/role.guard";
import { AllowToRoles } from "src/misc/allow.role.decorator";

@Controller("api/professor/")

export class ProfessorController {
    constructor(
        private professorService: ProfessorService
    ) { }

    @UseGuards(RoleGuard)
    @AllowToRoles("administrator")
    @Get()
    async getProfessor(@Query("by") by : string, @Query("id") id: number): Promise<Professor | Professor[] | APIResponse> {
        let professor;

        if(by == "default"){
            professor = await this.professorService.getByID(id);
        }else if(by == "all"){
            professor = await this.professorService.getAll();
        }else {
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
    async postProfessor(@Body() data: AddProfessorDTO): Promise<Professor | APIResponse> {

        let professor = await this.professorService.getByUsername(data.username);

        if (professor != null) {
            return new Promise(resolve => { resolve(APIResponse.DUPLICATE_UNIQUE_VALUE); });
        }

        let dbprofessor = await this.professorService.add(data.firstName, data.lastName, data.username, data.password, null);

        if (dbprofessor == null) {
            return new Promise(resolve => { resolve(APIResponse.SAVE_FAILED); });
        }

        return new Promise(resolve => { resolve(dbprofessor)});

    }

    @UseGuards(RoleGuard)
    @AllowToRoles("administrator")
    @Patch()
    async patchProfessor(@Body() data : UpdateProfessorDTO) : Promise<APIResponse> {
        let professor = await this.professorService.getByUsername(data.username);

        if(professor != null && professor.professorId != data.professorId){
            return new Promise(resolve => {resolve(APIResponse.DUPLICATE_UNIQUE_VALUE)});
        }

        let dbprofessor = await this.professorService.update(data.professorId, data.firstName, data.lastName, data.username, data.password);

        if(dbprofessor == null){
            return new Promise(resolve => {resolve(APIResponse.SAVE_FAILED)});
        }

        return new Promise(resolve => {resolve(APIResponse.OK)});

    }

    @UseGuards(RoleGuard)
    @AllowToRoles("administrator")
    @Delete()
    async deleteProfessor(@Body() data : DeleteProfessorDTO) : Promise<APIResponse>{

        let professor = await this.professorService.delete(data.professorId);

        if(professor == null){
            return new Promise(resolve => {resolve(APIResponse.DELETE_FAILED)});
        }

        return new Promise(resolve => {resolve(APIResponse.OK)});

    }

}