import { Body, Controller, Get, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AddTestDTO } from "src/dtos/test.dto";
import { Test } from "src/entities/test.entity";
import { RoleGuard } from "src/guards/role.guard";
import { AllowedRoles } from "src/misc/allow.role.decorator";
import { APIResponse } from "src/misc/api.response";
import { TestService } from "src/services/test.service";

@Controller("api/test/")
export class TestController {
    constructor(
        private testService: TestService,
    ){}

    @Get()
    async getById(@Query("id") id : number): Promise<Test | APIResponse>{
        let test = await this.testService.getById(id);

        if(test == null){
            return new Promise(resolve => {resolve(APIResponse.NULL_ENTRY)});
        }

        return new Promise(resolve => {resolve(test)});

    }

    @Get("active")
    async getAvailableTests() : Promise<Test[] | APIResponse> {
        let tests = await this.testService.getActive();

        if(tests == null){
            return new Promise(resolve => {resolve(APIResponse.NULL_ENTRY)});
        }

        return new Promise(resolve => {resolve(tests)});

    }

    @Get("professor")
    async getTestsByProfessorId(@Query("id") id : number) : Promise<Test[] | APIResponse>{
        let tests = await this.testService.getByProfessorId(id);

        if(tests == null){
            return new Promise(resolve => {resolve(APIResponse.NULL_ENTRY)});
        }

        return new Promise(resolve => {resolve(tests)}); 

    }

    @UseGuards(RoleGuard)
    @AllowedRoles("administrator","professor")
    @Post()
    async postTest(@Body() data : AddTestDTO) : Promise<Test | APIResponse> {
        let test = await this.testService.add(data.professorId, data.testName, data.duration, data.questionCount, data.startAt, data.endAt);
        if(test == null){
            return new Promise(resolve => {resolve(APIResponse.NULL_ENTRY)});
        }

        return new Promise(resolve => {resolve(test)});
    }

}