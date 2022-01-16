import { Body, Controller, Get, Put, Query } from "@nestjs/common";
import { APIResponse } from "src/misc/api.response";
import { AddAdministratorDTO } from "src/dtos/administrator.dto";
import { Administrator } from "src/entities/administrator.entity";
import { AdministratorService } from "src/services/administrator.service";
import { validateLastName, validateName, validatePassword, validateUsername } from "src/misc/validations";

@Controller("api/admin/")
export class AdministratorController {
    constructor(
        private administratorService : AdministratorService
    ) {}

    @Get()
    async getAdminByID(@Query("id") id: number) : Promise<Administrator | APIResponse>{
        let administrator = await this.administratorService.getByID(id);
        if(administrator == null){
            return new Promise(resolve => {resolve(APIResponse.fromTemplate(APIResponse.NULL_ENTRY, "Not Found!"))});
        }

        return new Promise(resolve => {resolve(administrator)});
    }

    @Put()
    async putAdmin(@Body() data : AddAdministratorDTO): Promise<Administrator | APIResponse>{
        
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
        

        let administrator = await this.administratorService.getByUsername(data.username);
        if(administrator != null){
            return new Promise(resolve => {resolve(APIResponse.fromTemplate(APIResponse.DUPLICATE_UNIQUE_VALUE, "Username taken"))});
        }

        if(!(await this.administratorService.add(data))){
            return new Promise(resolve => {resolve(APIResponse.fromTemplate(APIResponse.SAVE_FAILED, "Failed to save"))});
        }

        return new Promise(resolve => {resolve(APIResponse.fromTemplate(APIResponse.OK, "Administrator added succesfully"))});
    }

}