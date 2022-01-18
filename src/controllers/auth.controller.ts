import { Body, Controller, HttpException, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { APIResponse } from "src/misc/api.response";
import { LoginAdministratorDTO } from "src/dtos/administrator.dto";
import { AdministratorService } from "src/services/administrator.service";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { Request } from "express";
import { JWTSecret } from "src/configs/config";
import { JSONWebToken, LoginResponse, RefreshTokenDTO } from "src/dtos/auth.dto";
import { LoginProfessorDTO } from "src/dtos/professor.dto";
import { ProfessorService } from "src/services/professor.service";
import { StudentService } from "src/services/student.service";
import { LoginStudentDTO } from "src/dtos/student.dto";
import { TokenService } from "src/services/token.service";
import { Token } from "src/entities/token.entity";

@Controller("auth/")
export class AuthController {
    constructor(
        private readonly administratorService : AdministratorService,
        private readonly professorService : ProfessorService,
        private readonly studentService : StudentService,
        private readonly tokenService : TokenService
    ){

    }

    private getDatePlus(seconds : number, minutes : number = 0, hours : number = 0, days : number = 0) : number{
        return Math.round((new Date().getTime()/1000)) + seconds + minutes * 60 + hours * 3600 + days * 86400; //Return UNIX time in seconds
    }

    private generateToken(id : number, identity : string, role : ("administrator" | "professor" | "student"), ip : string, userAgent : string, type : "access" | "refresh") : [token : string, expDate : Date]{
        let expiringDate = 0;
        if(type == "access"){
            expiringDate = this.getDatePlus(0,1,0,0);
        }else if(type = "refresh"){
            expiringDate = this.getDatePlus(0,3,0,0);
        }

        let tokenData = new JSONWebToken(
            id,
            identity,
            role,
            expiringDate,
            ip,
            userAgent,
            type
        );

        let token: string = jwt.sign(tokenData.toPlainObject(), JWTSecret);
        return [token, new Date(expiringDate*1000)];
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
    async administratorLogin(@Body() data : LoginAdministratorDTO, @Req() request : Request) : Promise<LoginResponse | APIResponse>{
        let administrator = await this.administratorService.getByUsername(data.username);

        if(administrator == null){
            return new Promise(resolve => {resolve(APIResponse.USER_DOES_NOT_EXIST)});
        }

        if(!this.checkPassword(administrator.passwordHash, data.password)){
            return new Promise(resolve => {resolve(APIResponse.PASSWORD_MISSMATCH)});
        }

        let token = this.generateToken(administrator.administratorId, administrator.username, "administrator", request.ip.toString(), request.headers["user-agent"], "access");
        let refreshToken = this.generateToken(administrator.administratorId, administrator.username, "administrator", request.ip.toString(), request.headers["user-agent"], "refresh");

        try {
            await this.tokenService.add(administrator.administratorId, "administrator", refreshToken[0], refreshToken[1]);
        }catch {
            return new Promise(resolve => {resolve(APIResponse.SAVE_FAILED)});
        }

        let response = new LoginResponse(administrator.administratorId, administrator.username, token[0], refreshToken[0], refreshToken[1].toISOString());

        return new Promise(resolve => {resolve(response)});
    }

    @Post("login/professor")
    async professorLogin(@Body() data : LoginProfessorDTO, @Req() request : Request) : Promise<LoginResponse | APIResponse>{
        let professor = await this.professorService.getByUsername(data.username);

        if(professor == null){
            return new Promise(resolve => {resolve(APIResponse.USER_DOES_NOT_EXIST)});
        }
        
        if(!this.checkPassword(professor.passwordHash, data.password)){
            return new Promise(resolve => {resolve(APIResponse.PASSWORD_MISSMATCH)});
        }

        let token = this.generateToken(professor.professorId, professor.username, "professor", request.ip.toString(), request.headers["user-agent"], "access");

        let refreshToken = this.generateToken(professor.professorId, professor.username, "professor", request.ip.toString(), request.headers["user-agent"], "refresh");

        try {
            await this.tokenService.add(professor.professorId, "professor", refreshToken[0], refreshToken[1]);
        }catch{
            return new Promise(resolve => {resolve(APIResponse.SAVE_FAILED)});
        }

        let response = new LoginResponse(professor.professorId, professor.username, token[0], refreshToken[0], refreshToken[1].toISOString());

        return new Promise(resolve => {resolve(response)});
    }

    @Post("login/student")
    async studentLogin(@Body() data : LoginStudentDTO, @Req() request : Request) : Promise<LoginResponse | APIResponse>{
        let student = await this.studentService.getByIndex(data.indexNumber);

        if(student == null){
            return new Promise(resolve => {resolve(APIResponse.USER_DOES_NOT_EXIST)});
        }

        let token = this.generateToken(student.studentId, student.indexNumber, "student", request.ip.toString(), request.headers["user-agent"], "access");

        let refreshToken = this.generateToken(student.studentId, student.indexNumber, "student", request.ip.toString(), request.headers["user-agent"], "refresh");

        try {
            await this.tokenService.add(student.studentId, "student", refreshToken[0], refreshToken[1]);
        }catch{
            return new Promise(resolve => {resolve(APIResponse.SAVE_FAILED)});
        }

        let response = new LoginResponse(student.studentId, student.indexNumber, token[0], refreshToken[0], refreshToken[1].toISOString());

        return new Promise(resolve => {resolve(response)});
    }

    @Post("token/refresh")
    async tokenRefresh(@Req() request : Request, @Body() data : RefreshTokenDTO) : Promise<LoginResponse | APIResponse>{
        let refreshToken : Token = await this.tokenService.getToken(data.refreshToken);

        if(refreshToken == null){
            return new Promise(resolve => {resolve(APIResponse.TOKEN_NOT_FOUND)});
        }
        
        if(refreshToken.isValid == false){
            return new Promise(resolve => {resolve(APIResponse.INVALID_TOKEN)});
        }
        
        let currentTimestamp = Math.round(new Date().getTime()/1000);

        if(currentTimestamp >= refreshToken.expiresAt.getTime()){
            return new Promise(resolve => {resolve(APIResponse.INVALID_TOKEN)});
        }
        
        let refreshTokenData : JSONWebToken;
        
        try {
            refreshTokenData = jwt.verify(data.refreshToken, JWTSecret);
        }catch (error){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED);
        }

        if(!refreshTokenData){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED);
        }
        
        if(refreshTokenData.ip != request.ip.toString()){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED);
        }
        
        if(refreshTokenData.userAgent != request.headers["user-agent"]){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED);
        }

        let newToken = this.generateToken(refreshTokenData.id, refreshTokenData.identity, refreshTokenData.role, refreshTokenData.ip, refreshTokenData.userAgent, "access");

        let response = new LoginResponse(
            refreshTokenData.id,
            refreshTokenData.identity,
            newToken[0],
            refreshToken[0],
            new Date(refreshTokenData.expDate*1000).toISOString()
        );

        return new Promise(resolve => {resolve(response)});

    }

}