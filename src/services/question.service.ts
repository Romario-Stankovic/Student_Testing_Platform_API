import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddQuestionDTO } from "src/dtos/question.dto";
import { Question } from "src/entities/question.entity";
import { Repository } from "typeorm/repository/Repository";

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private readonly question: Repository<Question>
    ) { }

    async getByID(id: number): Promise<Question | null> {

        let question = await this.question.findOne(id, { relations: ["answers"] });

        if (question == undefined) {
            return new Promise(resolve => { resolve(null); });
        }

        return new Promise(resolve => { resolve(question); });

    }

    add(data : AddQuestionDTO) : Promise<Question | null>{
        let newQuestion = new Question();
        newQuestion.testId = data.testId;
        newQuestion.questionText = data.questionText;
        newQuestion.imagePath = data.imagePath;

        try {
            let question = this.question.save(newQuestion);
            return new Promise(resolve => {resolve(question)});
        }catch (error){
            return new Promise(resolve => {resolve(null)});
        }

    }

}