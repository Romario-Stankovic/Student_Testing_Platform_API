import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { resolve } from "path/posix";
import { Question } from "src/entities/question.entity";
import { Repository } from "typeorm";

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private readonly question: Repository<Question>
    ){}

    async getByID(id: number) : Promise<Question | null> {

        let question = await this.question.findOne(id);

        if(question == undefined){
            return new Promise(resovle => {resolve(null)});
        }

        return new Promise(resolve => {resolve(question)});

    }

}