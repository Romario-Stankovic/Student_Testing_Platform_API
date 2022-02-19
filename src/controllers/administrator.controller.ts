import { Body, Controller, Delete, Get, HttpException, HttpStatus, Patch, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { APIResponse } from "src/misc/api.response";
import { AddAdministratorDTO, DeleteAdminDTO, UpdateAdminDTO } from "src/dtos/administrator.dto";
import { Administrator } from "src/entities/administrator.entity";
import { AdministratorService } from "src/services/administrator.service";
import { AllowToRoles } from "src/misc/allow.role.decorator";
import { RoleGuard } from "src/guards/role.guard";
import { Request } from "express";

@Controller("api/admin/")
export class AdministratorController {
    constructor(
        private administratorService: AdministratorService
    ) { }

    @UseGuards(RoleGuard)
    @AllowToRoles("administrator")
    @Get()
    async getAdmin(@Query("by") by : string, @Query("id") id: number): Promise<Administrator | Administrator[] | APIResponse> {

        let administrator;

        if(by == "default"){
            administrator = await this.administratorService.getByID(id);
        }else if(by == "all"){
            administrator = await this.administratorService.getAll();
        }else{
            throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
        }
        
        if (administrator == null) {
            return new Promise(resolve => { resolve(APIResponse.NULL_ENTRY); });
        }

        return new Promise(resolve => { resolve(administrator); });
    }

    @UseGuards(RoleGuard)
    @AllowToRoles("administrator")
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

        return new Promise(resolve => { resolve(dbadministrator); });
    }

    @UseGuards(RoleGuard)
    @AllowToRoles("administrator")
    @Patch()
    async patchAdmin(@Body() data : UpdateAdminDTO) : Promise<APIResponse> {
        let admin = await this.administratorService.getByUsername(data.username);
        if(admin != null && admin.administratorId != data.administratorId){
            return new Promise(resolve => { resolve(APIResponse.DUPLICATE_UNIQUE_VALUE); });
        }

        let dbadmin = await this.administratorService.update(data.administratorId, data.firstName, data.lastName, data.username, data.password);

        if(dbadmin == null){
            return new Promise(resolve => {resolve(APIResponse.SAVE_FAILED)});
        }

        return new Promise(resolve => {resolve(APIResponse.OK)});

    }

    @UseGuards(RoleGuard)
    @AllowToRoles("administrator")
    @Delete()
    async deleteAdmin(@Body() data : DeleteAdminDTO, @Req() req : Request) : Promise<APIResponse> {
        
        let admin = await this.administratorService.getByID(data.administratorId);

        if(admin.administratorId == req.token.id){
            return new Promise(resolve => {resolve(APIResponse.DELETE_FAILED)});
        }

        let dbadmin = await this.administratorService.delete(data.administratorId);

        if(dbadmin == null){
            return new Promise(resolve => {resolve(APIResponse.DELETE_FAILED)});
        }

        return new Promise(resolve => {resolve(APIResponse.OK)});

    }

}