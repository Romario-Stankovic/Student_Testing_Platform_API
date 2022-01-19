import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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

}