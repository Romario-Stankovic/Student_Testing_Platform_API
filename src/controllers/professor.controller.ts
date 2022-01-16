import { Body, Controller, Get, Put, Query } from "@nestjs/common";
import { APIResponse } from "src/misc/api.response";
import { AddProfessorDTO } from "src/dtos/professor.dto";
import { Professor } from "src/entities/professor.entity";
import { ProfessorService } from "src/services/professor.service";
import { validateLastName, validateName, validatePassword, validateUsername } from "src/misc/validations";

@Controller("api/professor/")

export class ProfessorController {
    constructor(
        private professorService: ProfessorService
    ) { }

    @Get()
    async getProfessorByID(@Query("id") id: number): Promise<Professor | APIResponse> {
        let professor = await this.professorService.getByID(id);
        if (professor == null) {
            return new Promise(resolve => { resolve(APIResponse.fromTemplate(APIResponse.NULL_ENTRY, "Not Found!")) });
        }

        return new Promise(resolve => { resolve(professor) });

    }

    @Put()
    async putProfessor(@Body() data: AddProfessorDTO): Promise<Professor | APIResponse> {

        if(!validateName(data.firstName)){
            return new Promise(resolve => {resolve(APIResponse.fromTemplate(APIResponse.VALIDATION_FAILED, "Invalid firstName"))});
        }

        if(!validateLastName(data.lastName)){
            return new Promise(resolve => {resolve(APIResponse.fromTemplate(APIResponse.VALIDATION_FAILED, "Invalid lastName"))});
        }

        if(!validateUsername(data.username)){
            return new Promise(resolve => {resolve(APIResponse.fromTemplate(APIResponse.VALIDATION_FAILED, "Invalid username"))});
        }

        if(!validatePassword(data.password)){
            return new Promise(resolve => {resolve(APIResponse.fromTemplate(APIResponse.VALIDATION_FAILED, "Invalid password"))});
        }

        let professor = await this.professorService.getByUsername(data.username);

        if(professor != null){
            return new Promise(resolve => {resolve(APIResponse.fromTemplate(APIResponse.DUPLICATE_UNIQUE_VALUE, "Username taken"))});
        }

        if(!(await this.professorService.add(data))){
            return new Promise(resolve => {resolve(APIResponse.fromTemplate(APIResponse.SAVE_FAILED, "Failed to save"))});
        }

        return new Promise(resolve => {resolve(APIResponse.fromTemplate(APIResponse.OK, "Professor added successfully"))});

    }

}