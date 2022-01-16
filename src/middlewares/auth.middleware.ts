import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { AdministratorService } from "src/services/administrator.service";
import * as jwt from "jsonwebtoken";
import { JWTSecret } from "src/configs/config";
import { Request } from "express";
import { JSONWebToken } from "src/dtos/auth.dto";
import { StudentService } from "src/services/student.service";
import { ProfessorService } from "src/services/professor.service";

@Injectable()
export class AdminAuthMiddleware implements NestMiddleware {

    constructor (
        private readonly administratorService : AdministratorService,
        private readonly studentService : StudentService,
        private readonly professorService : ProfessorService
        ){

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

        let tokenData : JSONWebToken;
        try {
            tokenData = jwt.verify(tokenParts[1], JWTSecret);
        }catch(error) {
            throw new HttpException("Bad token", HttpStatus.UNAUTHORIZED);
        }

        if(!tokenData){
            throw new HttpException("Bad token", HttpStatus.UNAUTHORIZED);
        }

        if(tokenData.ip != request.ip.toString()){
            throw new HttpException("Bad token", HttpStatus.UNAUTHORIZED);
        }

        if(tokenData.user_agent != request.headers["user-agent"]){
            throw new HttpException("Bad token", HttpStatus.UNAUTHORIZED);
        }

        if (tokenData.role == "administrator") {
            let admin = await this.administratorService.getByID(tokenData.id);
            if (admin == null) {
                throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
            }
        }else if(tokenData.role == "student"){
            let student = await this.studentService.getByID(tokenData.id);
            if(student == null){
                throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
            }
        }else if(tokenData.role == "professor"){
            let professor = await this.professorService.getByID(tokenData.id);
            if(professor == null){
                throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
            }
        }

        let currentTimeStamp = new Date().getTime();

        if(currentTimeStamp >= tokenData.exp_date){
            throw new HttpException("Token has expired", HttpStatus.UNAUTHORIZED);
        }

        request.token = tokenData;

        next();
    }

}