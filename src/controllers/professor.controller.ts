import { Body, Controller, Get, Put, Query } from "@nestjs/common";
import { APIResponse } from "src/misc/api.response";
import { AddProfessorDTO } from "src/dtos/professor.dto";
import { Professor } from "src/entities/professor.entity";
import { ProfessorService } from "src/services/professor.service";

@Controller("api/professor/")

export class ProfessorController {
    constructor(
        private professorService: ProfessorService
    ) { }

    @Get()
    async getProfessorByID(@Query("id") id: number): Promise<Professor | APIResponse> {
        let professor = await this.professorService.getByID(id);
        if (professor == null) {
            return new Promise(resolve => { resolve(new APIResponse("Error", 2001, "Not found")) });
        }

        return new Promise(resolve => { resolve(professor) });

    }

    @Put()
    async putProfessor(@Body() data: AddProfessorDTO): Promise<Professor | APIResponse> {

        if(data.firstName == null || data.firstName.length == 0){
            return new Promise(resolve => {resolve(new APIResponse("Error", 2002, "First name not valid"))});
        }

        if(data.lastName == null || data.lastName.length == 0){
            return new Promise(resolve => {resolve(new APIResponse("Error", 2002, "Last name not valid"))});
        }

        if(data.password == null){
            return new Promise(resolve => {resolve(new APIResponse("Error", 2002, "Password not valid"))});
        }
        
        if(data.username == null || data.username.length == 0){
            return new Promise(resolve => {resolve(new APIResponse("Error", 2002, "Username not valid"))});
        }

        let professor = await this.professorService.getByUsername(data.username);

        if(professor != null){
            return new Promise(resolve => {resolve(new APIResponse("Error", 2003, "Username is taken"))});
        }

        if(!(await this.professorService.add(data))){
            return new Promise(resolve => {resolve(new APIResponse("Error", 1001, "Failed to save"))});
        }

        return new Promise(resolve => {resolve(new APIResponse("OK!", 0, "Professor added successfully"))});

    }

}