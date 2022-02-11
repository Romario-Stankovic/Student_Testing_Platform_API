import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Answer } from "src/entities/answer.entity";
import { Repository } from "typeorm";

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(Answer)
        private readonly repository: Repository<Answer>
    ){}

    async getByID(id : number) : Promise<Answer | null>{
        let answer = await this.repository.findOne(id);

        if(answer == undefined){
            return new Promise(resolve => {resolve(null)});
        }
        return new Promise(resolve => {resolve(answer)});

    }

    async getByQuestionId(questionId: number) : Promise<Answer[] | null>{
        let answers = await this.repository.find({where:{questionId: questionId}});
        if(answers.length == 0){
            return new Promise(resolve => {resolve(null)});
        }

        return new Promise(resolve => {resolve(answers)});

    }

    async add(questionId : number, answerText : string, imagePath : string, isCorrect : boolean) : Promise<Answer | null>{
        let newAnswer = new Answer();
        newAnswer.questionId = questionId;
        newAnswer.answerText = answerText;
        newAnswer.imagePath = imagePath;
        newAnswer.isCorrect = isCorrect;

        try {
            let answer = await this.repository.save(newAnswer);
            return new Promise(resolve => {resolve(answer)});
        }catch (error){
            return new Promise(resolve => {resolve(null)});
        }

    }

    async update(id : number,answerText : string, imagePath : string, isCorrect : boolean) : Promise<Answer | null>{
        let answer = await this.getByID(id);

        if(answer == null){
            return new Promise(resolve => {resolve(null)});
        }

        answer.answerText = answerText;
        answer.imagePath = imagePath;
        answer.isCorrect = isCorrect;

        try {
            let updatedAnswer = await this.repository.save(answer);
            return new Promise(resolve => {resolve(updatedAnswer)});
        }catch(error){
            return new Promise(resolve => {resolve(null)});
        }

    }


    async delete(id : number) : Promise<Answer | null>{

        let answer = await this.getByID(id);

        if(answer == null){
            return new Promise(resolve => {resolve(null)});
        }

        try {
            let deletedAnswer = await this.repository.remove(answer);
            return new Promise(resolve => {resolve(deletedAnswer)});
        }catch (error) {
            return new Promise(resolve => {resolve(null)});
        }


    }

}