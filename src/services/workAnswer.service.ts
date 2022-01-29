import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddWorkAnswerDTO, WorkQuestionDTO } from "src/dtos/workAnswer.dto";
import { WorkAnswer } from "src/entities/workAnswer.entity";
import { Repository } from "typeorm";

@Injectable()
export class WorkAnswerService {
    constructor(
        @InjectRepository(WorkAnswer)
        private readonly repository : Repository<WorkAnswer>
    ){}

    async add(data : AddWorkAnswerDTO) : Promise<WorkAnswer | null>{
        let newWorkAnswer = new WorkAnswer();
        newWorkAnswer.answerId = data.answerId;
        newWorkAnswer.duration = data.duration;
        newWorkAnswer.isChecked = data.isChecked;
        newWorkAnswer.workId = data.workId;

        try {
            let workAnswer = await this.repository.save(newWorkAnswer);
            return new Promise(resolve => {resolve(workAnswer)});
        }catch(error){
            return new Promise(resolve => {resolve(null)});
        }

    }

    async getWorkQuestion(workId : number, questionId : number) : Promise<WorkQuestionDTO | null>{

        let workAnswers = await this.repository.createQueryBuilder("workAnswer")
        .innerJoinAndSelect("workAnswer.answer", "answer")
        .innerJoinAndSelect("answer.question", "question")
        .where("answer.questionId = :questionId", {questionId})
        .andWhere("workAnswer.workId = :workId", {workId})

        .select("answer.answerId", "answerId")
        .addSelect("answer.answerText", "answerText")
        .addSelect("answer.imagePath", "answerImagePath")
        .addSelect("workAnswer.isChecked", "isChecked")
        .addSelect("answer.isCorrect", "isCorrect")

        .addSelect("question.questionText", "questionText")
        .addSelect("question.imagePath", "questionImagePath")
        .addSelect("workAnswer.duration", "duration")
        .getRawMany();

        if(workAnswers == undefined || workAnswers.length == 0){
            return new Promise(resolve => {resolve(null)});
        }

        let answers : {answerId: number, answerText : string, imagePath : string, isChecked : boolean}[] = [];
        let correctAnswers = 0;

        for(let answer of workAnswers){
            answers.push({answerId: answer.answerId, answerText: answer.answerText, imagePath: answer.answerImagePath, isChecked: (answer.isChecked == 1 ? true : false)});
            if(answer.isCorrect == 1){
                correctAnswers += 1;
            }
        }

        let question = new WorkQuestionDTO(workAnswers[0].questionText, workAnswers[0].questionImagePath, (correctAnswers > 1 ? true : false), workAnswers[0].duration, answers);

        return new Promise(resolve => {resolve(question)});

    }

    async updateAnswer(workId : number, answerId : number, isChecked : boolean, duration : number) : Promise<WorkAnswer | null>{
        let dbworkAnswer = await this.repository.findOne({where:{answerId: answerId, workId : workId}});
        if(dbworkAnswer == null){
            return new Promise(resolve => {resolve(null)});
        }

        dbworkAnswer.isChecked = isChecked;
        dbworkAnswer.duration = duration;

        try {
            let workAnswer = await this.repository.save(dbworkAnswer);
            return new Promise(resolve => {resolve(workAnswer)});
        }catch(error){
            return new Promise(resolve => {resolve(null)});
        }

    }

}