import { Body, Controller, Get, Put, Query } from "@nestjs/common";
import { APIResponse } from "src/api.response";
import { AddProfessorDTO } from "src/dtos/professor.dto";
import { Professor } from "src/entities/professor.entity";
import { ProfessorService } from "src/services/professor.service";

@Controller("api/professor/")

export class ProfessorController {
    constructor(
        private professorService : ProfessorService
    ) { }

    @Get()
    getProfessorByID(@Query("id") id : number): Promise<Professor | APIResponse> {
      return this.professorService.getByID(id);
    }

    @Put()
    putProfessor(@Body() data : AddProfessorDTO): Promise<Professor | APIResponse>{
        return this.professorService.add(data);
    }

}