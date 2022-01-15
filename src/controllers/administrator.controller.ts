import { Body, Controller, Get, Put, Query } from "@nestjs/common";
import { APIResponse } from "src/misc/api.response";
import { AddAdministratorDTO } from "src/dtos/administrator.dto";
import { Administrator } from "src/entities/administrator.entity";
import { AdministratorService } from "src/services/administrator.service";

@Controller("api/admin/")
export class AdministratorController {
    constructor(
        private administratorService : AdministratorService
    ) {}

    @Get()
    async getAdminByID(@Query("id") id: number) : Promise<Administrator | APIResponse>{
        let administrator = await this.administratorService.getByID(id);
        if(administrator == null){
            return new Promise(resolve => {resolve(new APIResponse("Error", 2001, "Not found"))});
        }

        return new Promise(resolve => {resolve(administrator)});
    }

    @Put()
    async putAdmin(@Body() data : AddAdministratorDTO): Promise<Administrator | APIResponse>{
        
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

        let administrator = await this.administratorService.getByUsername(data.username);
        if(administrator != null){
            return new Promise(resolve => {resolve(new APIResponse("Error", 2003, "Username is taken"))});
        }

        if(!(await this.administratorService.add(data))){
            return new Promise(resolve => {resolve(new APIResponse("Error", 1001, "Failed to save"))});
        }

        return new Promise(resolve => {resolve(new APIResponse("OK!", 0, "Administrator added successfully"))});
    }

}