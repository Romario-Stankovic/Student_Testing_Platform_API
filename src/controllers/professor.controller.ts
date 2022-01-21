import { Body, Controller, Get, Put, Query, UseGuards } from "@nestjs/common";
import { APIResponse } from "src/misc/api.response";
import { AddProfessorDTO } from "src/dtos/professor.dto";
import { Professor } from "src/entities/professor.entity";
import { ProfessorService } from "src/services/professor.service";
import { RoleGuard } from "src/guards/role.guard";
import { AllowedRoles } from "src/misc/allow.role.decorator";

@Controller("api/professor/")

export class ProfessorController {
    constructor(
        private professorService: ProfessorService
    ) { }

    @UseGuards(RoleGuard)
    @AllowedRoles("administrator")
    @Get()
    async getProfessorByID(@Query("id") id: number): Promise<Professor | APIResponse> {
        let professor = await this.professorService.getByID(id);
        if (professor == null) {
            return new Promise(resolve => { resolve(APIResponse.NULL_ENTRY); });
        }

        return new Promise(resolve => { resolve(professor); });

    }

    @UseGuards(RoleGuard)
    @AllowedRoles("administrator")
    @Put()
    async putProfessor(@Body() data: AddProfessorDTO): Promise<Professor | APIResponse> {

        let professor = await this.professorService.getByUsername(data.username);

        if (professor != null) {
            return new Promise(resolve => { resolve(APIResponse.DUPLICATE_UNIQUE_VALUE); });
        }

        if (!(await this.professorService.add(data))) {
            return new Promise(resolve => { resolve(APIResponse.SAVE_FAILED); });
        }

        return new Promise(resolve => { resolve(APIResponse.OK); });

    }

}