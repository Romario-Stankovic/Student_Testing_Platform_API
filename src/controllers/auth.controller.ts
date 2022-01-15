import { Body, Controller, Post, Req } from "@nestjs/common";
import { APIResponse } from "src/misc/api.response";
import { JWTAdministratorDTO, LoginAdministratorDTO, LoginResponseAdministratorDTO } from "src/dtos/administrator.dto";
import { AdministratorService } from "src/services/administrator.service";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken"
import { Request } from "express";
import { JWTSecret } from "src/configs/config";

@Controller("auth/")
export class AuthController {
    constructor(
        public administratorService : AdministratorService
    ){

    }

    @Post("login/admin")
    async login(@Body() data : LoginAdministratorDTO, @Req() request : Request) : Promise<LoginResponseAdministratorDTO | APIResponse>{
        let administrator = await this.administratorService.getByUsername(data.username);

        if(administrator == null){
            return new Promise(resolve => {resolve(new APIResponse("Auth Error", 4001, "Wrong Username"))});
        }

        let passwordHash = crypto.createHash("sha512");
        passwordHash.update(data.password);
        let passwordHashString = passwordHash.digest("hex").toUpperCase();

        if(administrator.passwordHash != passwordHashString){
            return new Promise(resolve => {resolve(new APIResponse("Auth Error", 4002, "Wrong Password"))});
        }

        let dateTime = new Date();
        dateTime.setDate(dateTime.getDate() + 1); // Add 1 day to the current date

        let tokenData = new JWTAdministratorDTO(
            administrator.administratorId,
            administrator.username,
            dateTime.getTime(),
            request.ip.toString(),
            request.headers["user-agent"]
        );

        let token: string = jwt.sign(tokenData.toPlainObject(), JWTSecret);

        let response : LoginResponseAdministratorDTO = new LoginResponseAdministratorDTO(
            administrator.administratorId,
            administrator.username,
            administrator.firstName,
            administrator.lastName,
            token
        );

        return new Promise(resolve => {resolve(response)});
    }
}