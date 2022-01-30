import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "src/entities/question.entity";
import { Repository } from "typeorm/repository/Repository";

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private readonly repository: Repository<Question>
    ) { }

    async getByID(id: number): Promise<Question | null> {

        let question = await this.repository.findOne(id, { relations: ["answers"] });

        if (question == undefined) {
            return new Promise(resolve => { resolve(null); });
        }

        return new Promise(resolve => { resolve(question); });

    }

    async getByTestID(id : number) : Promise<Question[] | null> {
        let questions = await this.repository.find({where: {testId : id}, relations: ["answers"]});

        if(questions.length == 0){
            return new Promise(resolve => {resolve(null)});
        }

        return new Promise(resolve => {resolve(questions)});

    }

    async add(testId : number, questionText : string, imagePath : string) : Promise<Question | null>{
        let newQuestion = new Question();
        newQuestion.testId = testId;
        newQuestion.questionText = questionText;
        newQuestion.imagePath = imagePath;

        try {
            let question = await this.repository.save(newQuestion);
            return new Promise(resolve => {resolve(question)});
        }catch (error){
            return new Promise(resolve => {resolve(null)});
        }

    }

}