import { Body, Controller, Get, Put, Query } from "@nestjs/common";
import { APIResponse } from "src/api.response";
import { AddAdministratorDTO } from "src/dtos/administrator.dto";
import { Administrator } from "src/entities/administrator.entity";
import { AdministratorService } from "src/services/administrator.service";

@Controller("api/admin/")
export class AdministratorController {
    constructor(
        private administratorService : AdministratorService
    ) {}

    @Get()
    getAdminByID(@Query("id") id: number) : Promise<Administrator | APIResponse>{
        return this.administratorService.getByID(id);
    }

    @Put()
    putAdmin(@Body() data : AddAdministratorDTO): Promise<Administrator | APIResponse>{
        return this.administratorService.add(data);
    }

}