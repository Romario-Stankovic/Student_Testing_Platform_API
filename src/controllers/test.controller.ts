import { Body, Controller, Get, Put, Query } from "@nestjs/common";
import { AddQuestionDTO } from "src/dtos/question.dto";
import { AddTestDTO } from "src/dtos/test.dto";
import { Test } from "src/entities/test.entity";
import { APIResponse } from "src/misc/api.response";
import { AnswerService } from "src/services/answer.service";
import { QuestionService } from "src/services/question.service";
import { TestService } from "src/services/test.service";

@Controller("api/test/")
export class TestController {
    constructor(
        private testService: TestService,
        private questionService : QuestionService,
        private answerService : AnswerService
    ){}

    @Get()
    async getById(@Query("id") id : number){
        let test = await this.testService.getById(id);

        if(test == null){
            return new Promise(resolve => {resolve(APIResponse.NULL_ENTRY)});
        }

        return new Promise(resolve => {resolve(test)});

    }

    @Get("active")
    async getAvailableTests() : Promise<Test[] | APIResponse> {
        let tests = await this.testService.getAllActive();

        if(tests == null){
            return new Promise(resolve => {resolve(APIResponse.NULL_ENTRY)});
        }

        return new Promise(resolve => {resolve(tests)});

    }

    @Get("professor")
    async getTestsByProfessorId(@Query("id") id : number){
        let tests = await this.testService.getByProfessorId(id);

        if(tests == null){
            return new Promise(resolve => {resolve(APIResponse.NULL_ENTRY)});
        }

        return new Promise(resolve => {resolve(tests)}); 

    }

    @Put()
    async putTest(@Body() data : AddTestDTO) : Promise<APIResponse> {
        let test = await this.testService.add(data);
        if(test == null){
            return new Promise(resolve => {resolve(APIResponse.SAVE_FAILED)});
        }

        return new Promise(resolve => {resolve(APIResponse.OK)});

    }

}