import { Body, Controller, Get, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { EndWorkDTO, StartWorkDTO, WorkDTO } from "src/dtos/work.dto";
import { AddWorkAnswerDTO, PatchWorkAnswerDTO } from "src/dtos/workAnswer.dto";
import { WorkAnswer } from "src/entities/workAnswer.entity";
import { RoleGuard } from "src/guards/role.guard";
import { AllowedRoles } from "src/misc/allow.role.decorator";
import { APIResponse } from "src/misc/api.response";
import { AnswerService } from "src/services/answer.service";
import { QuestionService } from "src/services/question.service";
import { StudentService } from "src/services/student.service";
import { TestService } from "src/services/test.service";
import { WorkService } from "src/services/work.service";
import { WorkAnswerService } from "src/services/workAnswer.service";

@Controller("api/work")
export class WorkController {
    constructor (
        private workService : WorkService,
        private testService : TestService,
        private studentService : StudentService,
        private questionService : QuestionService,
        private answerService : AnswerService,
        private workAnswerService : WorkAnswerService
    ){}

    @UseGuards(RoleGuard)

    @AllowedRoles("administrator", "student")
    @Post("start")
    async startWork(@Body() data : StartWorkDTO) : Promise<WorkDTO | APIResponse>{
        
        let dbwork = await this.workService.add(data);
        
        if(dbwork == null){
            return new Promise(resolve => {resolve(APIResponse.SAVE_FAILED)});
        }

        let test = await this.testService.getById(data.testId);

        let questions = await this.questionService.getByTestID(test.testId);

        if(questions == null || questions.length < test.questionCount){
            return new Promise(resolve => {resolve(APIResponse.TEST_QUESTION_SHORTAGE)});
        }

        let workQuestions :{id: number}[] = [];

        for(let i = test.questionCount; i>0; i--){
            let availableQuestionCount = questions.length;
            let randomIndex = Math.floor((Math.random() * (availableQuestionCount - 0) + 0));

            workQuestions.push( {id: questions.splice(randomIndex, 1)[0].questionId} );
        }

        let workEndsAt = new Date(dbwork.startedAt.getTime() + test.duration * 1000);

        let work = new WorkDTO(dbwork.workId, test.testName, dbwork.startedAt, workEndsAt, workQuestions);

        for(let workQuestion of workQuestions){
            let answers = await this.answerService.getAllForQuestion(workQuestion.id);
            if(answers == null){
                continue;
            }
            for(let answer of answers){
                let workAnswerData = new AddWorkAnswerDTO(work.workId, answer.answerId, 0, false);
                await this.workAnswerService.add(workAnswerData);
            }
        }

        return new Promise(resolve => {resolve(work)});

    }

    @Post("end")
    async endWork(@Body() data : EndWorkDTO) : Promise<APIResponse>{
        let work = await this.workService.endWork(data.workId);

        if(work == null){
            return new Promise(resolve => {resolve(APIResponse.NULL_ENTRY)});
        }

        return new Promise(resolve => {resolve(APIResponse.OK)});

    }

    @Get("question")
    async getWorkQuestion(@Query("workId") workId : number, @Query("questionId") questionId : number) {
        let workQuestion = await this.workAnswerService.getWorkQuestion(workId, questionId);

        if(workQuestion == null){
            return new Promise(resolve => {resolve(APIResponse.NULL_ENTRY)});
        }

        return new Promise(resolve => {resolve(workQuestion)});
    }

    @Patch("question")
    async patchWorkQuestion(@Body() data : PatchWorkAnswerDTO) : Promise<APIResponse>{

        for (let answer of data.answers){
            let dbanswer = await this.workAnswerService.updateAnswer(data.workId, answer.id, answer.isChecked, data.duration);
            if(dbanswer == null){
                return new Promise(resolve => {resolve(APIResponse.SAVE_FAILED)})
            }
        }

        return new Promise(resolve => {resolve(APIResponse.OK)})

    }

}