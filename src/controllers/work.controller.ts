import { Body, Controller, Get, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { WorkQuestion } from "src/dtos/workAnswer.dto";
import { EndWorkDTO, StartWorkDTO, WorkDTO } from "src/dtos/work.dto";
import { PatchWorkAnswerDTO } from "src/dtos/workAnswer.dto";
import { RoleGuard } from "src/guards/role.guard";
import { AllowedRoles } from "src/misc/allow.role.decorator";
import { APIResponse } from "src/misc/api.response";
import { AnswerService } from "src/services/answer.service";
import { QuestionService } from "src/services/question.service";
import { TestService } from "src/services/test.service";
import { WorkService } from "src/services/work.service";
import { WorkAnswerService } from "src/services/workAnswer.service";
import { Work } from "src/entities/work.entity";
import { resolve } from "path/posix";

@Controller("api/work/")
export class WorkController {
    constructor (
        private workService : WorkService,
        private testService : TestService,
        private questionService : QuestionService,
        private answerService : AnswerService,
        private workAnswerService : WorkAnswerService
    ){}

    @Get()
    async getWork(@Query("id") id : number) : Promise<Work | APIResponse> {
        let work = await this.workService.getByID(id);
        if(work == null){
            return new Promise(resolve => {resolve(APIResponse.NULL_ENTRY)});
        }
        return new Promise(resolve => {resolve(work)});
    }

    @UseGuards(RoleGuard)
    @AllowedRoles("administrator", "student")
    @Post("start")
    async startWork(@Body() data : StartWorkDTO) : Promise<WorkDTO | APIResponse>{

        let dbwork = await this.workService.add(data.studentId, data.testId);
        
        if(dbwork == null){
            return new Promise(resolve => {resolve(APIResponse.SAVE_FAILED)});
        }

        let test = await this.testService.getById(data.testId);

        let questions = await this.questionService.getByTestID(test.testId);

        if(questions == null || questions.length < test.questionCount){
            return new Promise(resolve => {resolve(APIResponse.TEST_QUESTION_SHORTAGE)});
        }

        let workQuestions : number[] = [];

        for(let i = test.questionCount; i>0; i--){
            let availableQuestionCount = questions.length;
            let randomIndex = Math.floor((Math.random() * availableQuestionCount));

            workQuestions.push( questions.splice(randomIndex, 1)[0].questionId );
        }

        let workEndsAt = new Date(dbwork.startedAt.getTime() + test.duration * 1000);

        let work = new WorkDTO(dbwork.workId, test.testName, dbwork.startedAt, workEndsAt, workQuestions);

        for(let workQuestionID of workQuestions){
            let answers = await this.answerService.getByQuestionId(workQuestionID);
            if(answers == null){
                continue;
            }
            for(let answer of answers){
                await this.workAnswerService.add(work.workId, answer.answerId, 0, false);
            }
        }

        return new Promise(resolve => {resolve(work)});

    }

    @Post("finish")
    async endWork(@Body() data : EndWorkDTO) : Promise<APIResponse | any>{
        let dbwork = await this.workService.getByID(data.workId);

        if(dbwork == null){
            return new Promise(resolve => {resolve(APIResponse.NULL_ENTRY)});
        }

        if(dbwork.endedAt != null){
            return new Promise(resolve => {resolve(APIResponse.WORK_ENDED)})
        }

        let workQuestions = await this.workAnswerService.getWorkQuestions(dbwork.workId, true);
        let result = 0;

        for (let question of workQuestions) {
            let correct = 0;
            let incorrect = 0;
            let totalCorrect = 0;

            let answers = question.answers;

            for (let answer of answers) {
                totalCorrect += (answer.isCorrect ? 1 : 0);

                if (answer.isChecked && !answer.isCorrect) {
                    incorrect++;
                } else if (answer.isChecked && answer.isCorrect) {
                    correct++;
                }
            }

            if (incorrect >= 1) {
                result += 0;
            } else {
                result += (correct / totalCorrect);
            }
        }

        result = (result / workQuestions.length) * 100;
        
        dbwork = await this.workService.endWork(dbwork.workId, result);

        return new Promise(resolve => {resolve(dbwork)});

    }

    @Get("question")
    async getWorkQuestion(@Query("workId") workId : number, @Query("questionId") questionId : number): Promise<WorkQuestion | APIResponse> {
        
        let work = await this.workService.getByID(workId);
        
        if(work == null){
            return new Promise(resolve => {resolve(APIResponse.NULL_ENTRY)});
        }

        let workQuestion = await this.workAnswerService.getWorkQuestion(workId, questionId);

        if(workQuestion == null){
            return new Promise(resolve => {resolve(APIResponse.NULL_ENTRY)});
        }

        return new Promise(resolve => {resolve(workQuestion)});
    }

    @Patch("question")
    async patchWorkQuestion(@Body() data : PatchWorkAnswerDTO) : Promise<APIResponse>{

        let work = await this.workService.getByID(data.workId);

        if(work == null){
            return new Promise(resolve => {resolve(APIResponse.NULL_ENTRY)});
        }

        if(work.endedAt != null){
            return new Promise(resolve => {resolve(APIResponse.WORK_ENDED)});
        }

        for (let answer of data.answers){
            let dbanswer = await this.workAnswerService.updateWorkAnswer(data.workId, answer.id, answer.isChecked, data.duration);
            if(dbanswer == null){
                return new Promise(resolve => {resolve(APIResponse.SAVE_FAILED)})
            }
        }

        return new Promise(resolve => {resolve(APIResponse.OK)})

    }

    @Get("question/all")
    async getWorkQuestions(@Query("id") workId : number) : Promise <WorkQuestion[] | APIResponse>{
        let questions = await this.workAnswerService.getWorkQuestions(workId);

        if(questions == null){
            return new Promise(resolve => {resolve(APIResponse.NULL_ENTRY)});
        }

        return new Promise(resolve => {resolve(questions)});

    }

}