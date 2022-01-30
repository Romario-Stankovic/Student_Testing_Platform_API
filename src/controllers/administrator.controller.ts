import { Body, Controller, Get, Post, Put, Query, UseGuards } from "@nestjs/common";
import { APIResponse } from "src/misc/api.response";
import { AddAdministratorDTO } from "src/dtos/administrator.dto";
import { Administrator } from "src/entities/administrator.entity";
import { AdministratorService } from "src/services/administrator.service";
import { AllowedRoles } from "src/misc/allow.role.decorator";
import { RoleGuard } from "src/guards/role.guard";

@Controller("api/admin/")
export class AdministratorController {
    constructor(
        private administratorService: AdministratorService
    ) { }

    @UseGuards(RoleGuard)
    @AllowedRoles("administrator")
    @Get()
    async getAdminByID(@Query("id") id: number): Promise<Administrator | APIResponse> {
        let administrator = await this.administratorService.getByID(id);
        if (administrator == null) {
            return new Promise(resolve => { resolve(APIResponse.NULL_ENTRY); });
        }

        return new Promise(resolve => { resolve(administrator); });
    }

    @UseGuards(RoleGuard)
    @AllowedRoles("administrator")
    @Post()
    async postAdmin(@Body() data: AddAdministratorDTO): Promise<Administrator | APIResponse> {

        let administrator = await this.administratorService.getByUsername(data.username);
        if (administrator != null) {
            return new Promise(resolve => { resolve(APIResponse.DUPLICATE_UNIQUE_VALUE); });
        }

        let dbadministrator = await this.administratorService.add(data.firstName, data.lastName, data.username, data.password);
        if (dbadministrator == null) {
            return new Promise(resolve => { resolve(APIResponse.SAVE_FAILED); });
        }

        return new Promise(resolve => { resolve(APIResponse.OK); });
    }

}