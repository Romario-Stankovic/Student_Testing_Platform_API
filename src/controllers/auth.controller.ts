import { Body, Controller, Post, Req } from "@nestjs/common";
import { APIResponse } from "src/misc/api.response";
import { AdministratorIdentity, LoginAdministratorDTO } from "src/dtos/administrator.dto";
import { AdministratorService } from "src/services/administrator.service";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { Request } from "express";
import { JWTSecret } from "src/configs/config";
import { JSONWebToken, LoginResponse, RefreshTokenDTO } from "src/dtos/auth.dto";
import { ProfessorIdentity, LoginProfessorDTO } from "src/dtos/professor.dto";
import { ProfessorService } from "src/services/professor.service";
import { StudentService } from "src/services/student.service";
import { StudentIdentity, LoginStudentDTO } from "src/dtos/student.dto";
import { TokenService } from "src/services/token.service";
import { Token } from "src/entities/token.entity";

@Controller("auth/")
export class AuthController {
    constructor(
        private readonly administratorService: AdministratorService,
        private readonly professorService: ProfessorService,
        private readonly studentService: StudentService,
        private readonly tokenService: TokenService
    ) {

    }

    private getDatePlus(seconds: number, minutes: number = 0, hours: number = 0, days: number = 0): number {
        return (new Date().getTime() + seconds * 1000 + minutes * 60_000 + hours * 3_600_000 + days * 86_400_000); //Return UNIX time in seconds
    }

    private generateToken(id: number, identity: string, role: ("administrator" | "professor" | "student"), ip: string, userAgent: string, type: "access" | "refresh"): [token: string, expDate: Date] {
        let expiringDate = 0;
        if (type == "access") {
            expiringDate = this.getDatePlus(0, 5, 0, 0);
        } else if (type = "refresh") {
            expiringDate = this.getDatePlus(0, 0, 0, 14);
        }

        let tokenData = new JSONWebToken(id, identity, role, expiringDate, ip, userAgent, type);

        let token: string = jwt.sign(tokenData.toPlainObject(), JWTSecret);
        return [token, new Date(expiringDate)];
    }

    private checkPassword(storedPassword, receivedPassword) {
        let hash = crypto.createHash("sha512");
        hash.update(receivedPassword);
        if (storedPassword != hash.digest("hex").toUpperCase()) {
            return false;
        }

        return true;
    }

    @Post("login/admin")
    async administratorLogin(@Body() data: LoginAdministratorDTO, @Req() request: Request): Promise<LoginResponse | APIResponse> {
        let administrator = await this.administratorService.getByUsername(data.username);

        if (administrator == null) {
            return new Promise(resolve => { resolve(APIResponse.USER_DOES_NOT_EXIST); });
        }

        if (!this.checkPassword(administrator.passwordHash, data.password)) {
            return new Promise(resolve => { resolve(APIResponse.PASSWORD_MISMATCH); });
        }

        let token = this.generateToken(administrator.administratorId, administrator.username, "administrator", request.ip.toString(), request.headers["user-agent"], "access");
        let refreshToken = this.generateToken(administrator.administratorId, administrator.username, "administrator", request.ip.toString(), request.headers["user-agent"], "refresh");

        let dbtoken = await this.tokenService.add(administrator.administratorId, "administrator", refreshToken[0], refreshToken[1]);
        if(dbtoken == null){
            return new Promise(resolve => { resolve(APIResponse.SAVE_FAILED); });
        }

        let response = new LoginResponse(administrator.administratorId, administrator.username, token[0], refreshToken[0], refreshToken[1].toISOString());

        return new Promise(resolve => { resolve(response); });
    }

    @Post("login/professor")
    async professorLogin(@Body() data: LoginProfessorDTO, @Req() request: Request): Promise<LoginResponse | APIResponse> {
        let professor = await this.professorService.getByUsername(data.username);

        if (professor == null) {
            return new Promise(resolve => { resolve(APIResponse.USER_DOES_NOT_EXIST); });
        }

        if (!this.checkPassword(professor.passwordHash, data.password)) {
            return new Promise(resolve => { resolve(APIResponse.PASSWORD_MISMATCH); });
        }

        let token = this.generateToken(professor.professorId, professor.username, "professor", request.ip.toString(), request.headers["user-agent"], "access");

        let refreshToken = this.generateToken(professor.professorId, professor.username, "professor", request.ip.toString(), request.headers["user-agent"], "refresh");

        let dbtoken = await this.tokenService.add(professor.professorId, "professor", refreshToken[0], refreshToken[1]);
        if(dbtoken == null){
            return new Promise(resolve => { resolve(APIResponse.SAVE_FAILED); });
        }

        let response = new LoginResponse(professor.professorId, professor.username, token[0], refreshToken[0], refreshToken[1].toISOString());

        return new Promise(resolve => { resolve(response); });
    }

    @Post("login/student")
    async studentLogin(@Body() data: LoginStudentDTO, @Req() request: Request): Promise<LoginResponse | APIResponse> {
        let student = await this.studentService.getByIndex(data.indexNumber);

        if (student == null) {
            return new Promise(resolve => { resolve(APIResponse.USER_DOES_NOT_EXIST); });
        }

        let token = this.generateToken(student.studentId, student.indexNumber, "student", request.ip.toString(), request.headers["user-agent"], "access");

        let refreshToken = this.generateToken(student.studentId, student.indexNumber, "student", request.ip.toString(), request.headers["user-agent"], "refresh");

        let dbtoken = await this.tokenService.add(student.studentId, "student", refreshToken[0], refreshToken[1]);
        if(dbtoken == null){
            return new Promise(resolve => { resolve(APIResponse.SAVE_FAILED); });
        }

        let response = new LoginResponse(student.studentId, student.indexNumber, token[0], refreshToken[0], refreshToken[1].toISOString());

        return new Promise(resolve => { resolve(response); });
    }

    @Post("token/refresh")
    async tokenRefresh(@Req() request: Request, @Body() data: RefreshTokenDTO): Promise<LoginResponse | APIResponse> {
        let refreshToken: Token = await this.tokenService.getByToken(data.refreshToken);

        if (refreshToken == null) {
            return new Promise(resolve => { resolve(APIResponse.TOKEN_NOT_FOUND)});
        }

        if (refreshToken.isValid == false) {
            return new Promise(resolve => { resolve(APIResponse.INVALID_TOKEN)});
        }

        let currentTimestamp = new Date().getTime();

        if (currentTimestamp >= refreshToken.expiresAt.getTime()) {
            return new Promise(resolve => { resolve(APIResponse.INVALID_TOKEN)});
        }

        let refreshTokenData: JSONWebToken;

        try {
            refreshTokenData = jwt.verify(data.refreshToken, JWTSecret);
        } catch (error) {
            return new Promise(resolve => { resolve(APIResponse.BAD_TOKEN)});
        }

        if (!refreshTokenData) {
            return new Promise(resolve => { resolve(APIResponse.BAD_TOKEN)});
        }

        if (refreshTokenData.ip != request.ip.toString()) {
            return new Promise(resolve => { resolve(APIResponse.BAD_TOKEN)});
        }

        if (refreshTokenData.userAgent != request.headers["user-agent"]) {
            return new Promise(resolve => { resolve(APIResponse.BAD_TOKEN)});
        }

        if(refreshTokenData.role == "administrator"){
            let administrator = await this.administratorService.getByID(refreshTokenData.id);
            if(administrator == null){
                return new Promise(resolve => { resolve(APIResponse.USER_DOES_NOT_EXIST)});
            }
        }else if(refreshTokenData.role == "professor"){
            let professor = await this.professorService.getByID(refreshTokenData.id);
            if(professor == null){
                return new Promise(resolve => { resolve(APIResponse.USER_DOES_NOT_EXIST)});
            }
        }else if(refreshTokenData.role == "student"){
            let student = await this.studentService.getByID(refreshTokenData.id);
            if(student == null){
                return new Promise(resolve => { resolve(APIResponse.USER_DOES_NOT_EXIST)});
            }
        }else{
            return new Promise(resolve => {resolve(APIResponse.USER_DOES_NOT_EXIST)});
        }

        let newToken = this.generateToken(refreshTokenData.id, refreshTokenData.identity, refreshTokenData.role, refreshTokenData.ip, refreshTokenData.userAgent, "access");

        let response = new LoginResponse(
            refreshTokenData.id,
            refreshTokenData.identity,
            newToken[0],
            refreshToken.token,
            new Date(refreshTokenData.expDate).toISOString()
        );

        return new Promise(resolve => { resolve(response); });

    }

    @Post("token/identity")
    async getTokenHolderIdentity(@Req() request : Request) : Promise<StudentIdentity | AdministratorIdentity | ProfessorIdentity | APIResponse>{
        let token = request.token;
        if(token.role == "administrator"){
            let admin = await this.administratorService.getByID(token.id);
            
            if(admin == null){
                return new Promise(resolve => {resolve(APIResponse.USER_DOES_NOT_EXIST)});
            }

            return new Promise(resolve => {resolve(
                new AdministratorIdentity(token.id, token.role,admin.firstName, admin.lastName, admin.username)
            )});
        }
        else if(token.role == "professor"){
            let professor = await this.professorService.getByID(token.id);

            if(professor == null){
                return new Promise(resolve => {resolve(APIResponse.USER_DOES_NOT_EXIST)});
            }

            return new Promise(resolve => {resolve(
                new ProfessorIdentity(token.id, token.role,professor.firstName, professor.lastName, professor.username, professor.imagePath)
            )});
        }
        else if(token.role == "student"){
            let student = await this.studentService.getByID(token.id);

            if(student == null){
                return new Promise(resolve => {resolve(APIResponse.USER_DOES_NOT_EXIST)});
            }

            return new Promise(resolve => {resolve(
                new StudentIdentity(token.id, token.role,student.firstName, student.lastName, student.indexNumber, student.imagePath)
            )});
        }
    }

}