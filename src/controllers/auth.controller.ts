import { Body, Controller, Post, Req } from "@nestjs/common";
import { APIResponse } from "src/misc/api.response";
import { LoginAdministratorDTO } from "src/dtos/administrator.dto";
import { AdministratorService } from "src/services/administrator.service";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { Request } from "express";
import { JWTSecret } from "src/configs/config";
import { JSONWebToken, LoginResponseAdministratorDTO, LoginResponseProfessorDTO, LoginResponseStudentDTO } from "src/dtos/auth.dto";
import { LoginProfessorDTO } from "src/dtos/professor.dto";
import { ProfessorService } from "src/services/professor.service";
import { StudentService } from "src/services/student.service";
import { LoginStudentDTO } from "src/dtos/student.dto";

@Controller("auth/")
export class AuthController {
    constructor(
        private readonly administratorService : AdministratorService,
        private readonly professorService : ProfessorService,
        private readonly studentService : StudentService
    ){

    }

    private getDatePlus(seconds : number, minutes : number = 0, hours : number = 0, days : number = 0){
        return Math.round((new Date().getTime()/1000)) + seconds + minutes * 60 + hours * 3600 + days * 86400; //Return UNIX time
    }

    private generateToken(id : number, identity : string, role : ("administrator" | "professor" | "student"), ip : string, userAgent : string, exp_in_secods = 0, exp_in_minutes = 0, exp_in_hours = 0, exp_in_days = 0) : string{

        let expDate = this.getDatePlus(exp_in_secods, exp_in_minutes, exp_in_hours, exp_in_days);

        let tokenData = new JSONWebToken(
            id,
            identity,
            role,
            expDate,
            ip,
            userAgent
        );

        let token: string = jwt.sign(tokenData.toPlainObject(), JWTSecret);
        return token;
    }

    private checkPassword(storedPassword, receivedPassword){
        let hash = crypto.createHash("sha512");
        hash.update(receivedPassword);
        if(storedPassword != hash.digest("hex").toUpperCase()){
            return false;
        }

        return true;
    }

    @Post("login/admin")
    async administratorLogin(@Body() data : LoginAdministratorDTO, @Req() request : Request) : Promise<LoginResponseAdministratorDTO | APIResponse>{
        let administrator = await this.administratorService.getByUsername(data.username);

        if(administrator == null){
            return new Promise(resolve => {resolve(APIResponse.USER_DOES_NOT_EXIST)});
        }

        if(!this.checkPassword(administrator.passwordHash, data.password)){
            return new Promise(resolve => {resolve(APIResponse.PASSWORD_MISSMATCH)});
        }

        let token = this.generateToken(administrator.administratorId, administrator.username, "administrator", request.ip.toString(), request.headers["user-agent"], 0, 0, 0, 1);

        let response : LoginResponseAdministratorDTO = new LoginResponseAdministratorDTO(
            administrator.administratorId,
            administrator.username,
            administrator.firstName,
            administrator.lastName,
            token
        );

        return new Promise(resolve => {resolve(response)});
    }

    @Post("login/professor")
    async professorLogin(@Body() data : LoginProfessorDTO, @Req() request : Request) : Promise<LoginResponseProfessorDTO | APIResponse>{
        let professor = await this.professorService.getByUsername(data.username);

        if(professor == null){
            return new Promise(resolve => {resolve(APIResponse.USER_DOES_NOT_EXIST)});
        }
        
        if(!this.checkPassword(professor.passwordHash, data.password)){
            return new Promise(resolve => {resolve(APIResponse.PASSWORD_MISSMATCH)});
        }

        let token = this.generateToken(professor.professorId, professor.username, "professor", request.ip.toString(), request.headers["user-agent"], 0, 0, 5);

        let response : LoginResponseProfessorDTO = new LoginResponseProfessorDTO(
            professor.professorId,
            professor.username,
            professor.firstName,
            professor.lastName,
            professor.imagePath,
            token
        );

        return new Promise(resolve => {resolve(response)});
    }

    @Post("login/student")
    async studentLogin(@Body() data : LoginStudentDTO, @Req() request : Request) : Promise<LoginResponseStudentDTO | APIResponse>{
        let student = await this.studentService.getByIndex(data.indexNumber);

        if(student == null){
            return new Promise(resolve => {resolve(APIResponse.USER_DOES_NOT_EXIST)});
        }

        let token = this.generateToken(student.studentId, student.indexNumber, "student", request.ip.toString(), request.headers["user-agent"], 0, 0, 5);

        let response : LoginResponseStudentDTO = new LoginResponseStudentDTO(
            student.studentId,
            student.firstName,
            student.lastName,
            student.indexNumber,
            student.imagePath,
            token
        );

        return new Promise(resolve => {resolve(response)});
    }

}