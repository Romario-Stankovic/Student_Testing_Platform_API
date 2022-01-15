import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { AdministratorService } from "src/services/administrator.service";
import * as jwt from "jsonwebtoken";
import { JWTAdministratorDTO } from "src/dtos/administrator.dto";
import { JWTSecret } from "src/configs/config";
import { Request } from "express";

@Injectable()
export class AdminAuthMiddleware implements NestMiddleware {

    constructor (private readonly administratorService : AdministratorService){

    }

    async use(request: Request, response: Response, next: NextFunction) {
        
        if(!request.headers.authorization){
            throw new HttpException("Token not found", HttpStatus.UNAUTHORIZED);
        }

        let token = request.headers.authorization;

        const tokenParts = token.split(" ");

        if(tokenParts.length != 2){
            throw new HttpException("Bad token", HttpStatus.UNAUTHORIZED);
        }

        let tokenData : JWTAdministratorDTO;
        tokenData = jwt.verify(tokenParts[1], JWTSecret);

        if(!tokenData){
            throw new HttpException("Bad token", HttpStatus.UNAUTHORIZED);
        }

        if(tokenData.ip != request.ip.toString()){
            throw new HttpException("Bad token", HttpStatus.UNAUTHORIZED);
        }

        if(tokenData.user_agent != request.headers["user-agent"]){
            throw new HttpException("Bad token", HttpStatus.UNAUTHORIZED);
        }

        let admin = await this.administratorService.getByID(tokenData.administratorId);

        if(admin == null){
            throw new HttpException("Administrator not found", HttpStatus.UNAUTHORIZED);
        }

        let currentTimeStamp = new Date().getTime();

        if(currentTimeStamp >= tokenData.exp_date){
            throw new HttpException("Token has expired", HttpStatus.UNAUTHORIZED);
        }

        next();
    }

}