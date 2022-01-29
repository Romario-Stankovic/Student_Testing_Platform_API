import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddAnswerDTO } from "src/dtos/answer.dto";
import { Answer } from "src/entities/answer.entity";
import { Repository } from "typeorm";

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(Answer)
        private readonly repository: Repository<Answer>
    ){}

    async add(data: AddAnswerDTO) : Promise<Answer | null>{
        let newAnswer = new Answer();
        newAnswer.questionId = data.questionId;
        newAnswer.answerText = data.answerText;
        newAnswer.imagePath = data.imagePath;
        newAnswer.isCorrect = data.isCorrect;

        try {
            let answer = await this.repository.save(newAnswer);
            return new Promise(resolve => {resolve(answer)});
        }catch (error){
            return new Promise(resolve => {resolve(null)});
        }

    }

    async getAllForQuestion(questionId: number) : Promise<Answer[] | null>{
        let answers = await this.repository.find({where:{questionId: questionId}});
        if(answers.length == 0){
            return new Promise(resolve => {resolve(null)});
        }

        return new Promise(resolve => {resolve(answers)});

    }

}