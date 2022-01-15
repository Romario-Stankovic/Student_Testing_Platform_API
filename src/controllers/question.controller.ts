import { Controller, Get, Query } from "@nestjs/common";
import { Question } from "src/entities/question.entity";
import { APIResponse } from "src/misc/api.response";
import { QuestionService } from "src/services/question.service";

@Controller("api/question/")
export class QuestionController {
    constructor (
        private questionService : QuestionService
    ) { }

    @Get()
    async getQuestionWithAnswers(@Query("id") id : number) : Promise<Question | APIResponse> {
        let question = await this.questionService.getByID(id);

        if(question == null){
            return new Promise(resolve => {resolve(new APIResponse("Error", 2001, "Not found"))});
        }

        return new Promise(resolve => {resolve(question)});

    }

}