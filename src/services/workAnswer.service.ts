import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WorkQuestion, WorkQuestionAnswer } from "src/dtos/workAnswer.dto";
import { WorkAnswer } from "src/entities/workAnswer.entity";
import { Repository } from "typeorm";

@Injectable()
export class WorkAnswerService {
    constructor(
        @InjectRepository(WorkAnswer)
        private readonly repository: Repository<WorkAnswer>
    ) { }

    async getWorkAnswerByWorkAndAnswerID(workId: number, answerId: number): Promise<WorkAnswer | null> {
        let workAnswer = await this.repository.findOne({ where: { workId: workId, answerId: answerId } });

        if (workAnswer == undefined) {
            return new Promise(resolve => { resolve(null); });
        }

        return new Promise(resolve => { resolve(workAnswer); });

    }

    async getWorkQuestion(workId: number, questionId: number, showIsCorrect = false): Promise<WorkQuestion | null> {

        let workAnswers = await this.repository.createQueryBuilder("workAnswer")
            .innerJoinAndSelect("workAnswer.answer", "answer")
            .innerJoinAndSelect("answer.question", "question")
            .where("answer.questionId = :questionId", { questionId })
            .andWhere("workAnswer.workId = :workId", { workId })

            .select("answer.answerId", "answerId")
            .addSelect("answer.answerText", "answerText")
            .addSelect("answer.imagePath", "answerImagePath")
            .addSelect("workAnswer.isChecked", "isChecked")
            .addSelect("answer.isCorrect", "isCorrect")

            .addSelect("question.questionId", "questionId")
            .addSelect("question.questionText", "questionText")
            .addSelect("question.imagePath", "questionImagePath")
            .addSelect("workAnswer.duration", "duration")
            .getRawMany();

        if (workAnswers == undefined || workAnswers.length == 0) {
            return new Promise(resolve => { resolve(null); });
        }

        let answers: WorkQuestionAnswer[] = [];
        let correctAnswers = 0;

        for (let answer of workAnswers) {
            answers.push(new WorkQuestionAnswer(answer.answerId, answer.answerText, answer.answerImagePath, (answer.isChecked == 1 ? true : false), showIsCorrect ? (answer.isCorrect == 1 ? true : false) : null));
            if (answer.isCorrect == 1) {
                correctAnswers += 1;
            }
        }

        let question = new WorkQuestion(workAnswers[0].questionId, workAnswers[0].questionText, workAnswers[0].questionImagePath, (correctAnswers > 1 ? true : false), workAnswers[0].duration, answers);

        return new Promise(resolve => { resolve(question); });

    }

    async getWorkQuestions(workId: number, showIsCorrect = false): Promise<WorkQuestion[] | null> {
        let workQuestionIds = await this.repository.createQueryBuilder("workAnswer")
            .innerJoinAndSelect("workAnswer.answer", "answer")
            .where("workAnswer.workId = :workId", { workId })
            .groupBy("answer.questionId")
            .select("answer.questionId", "questionId")
            .getRawMany();

        let workQuestions: WorkQuestion[] = [];

        for (let workQuestionId of workQuestionIds) {
            let question = await this.getWorkQuestion(workId, workQuestionId.questionId, showIsCorrect);
            workQuestions.push(question);
        }

        if (workQuestions.length == 0) {
            return new Promise(resolve => { resolve(null); });
        }

        return new Promise(resolve => { resolve(workQuestions); });

    }

    async add(workId: number, answerId: number, duration: number, isChecked: boolean): Promise<WorkAnswer | null> {
        let newWorkAnswer = new WorkAnswer();

        newWorkAnswer.workId = workId;
        newWorkAnswer.answerId = answerId;
        newWorkAnswer.duration = duration;
        newWorkAnswer.isChecked = isChecked;

        try {
            let workAnswer = await this.repository.save(newWorkAnswer);
            return new Promise(resolve => { resolve(workAnswer); });
        } catch (error) {
            return new Promise(resolve => { resolve(null); });
        }

    }

    async addMultiple(data: { workId: number, answerId: number, duration: number, isChecked: boolean; }[]): Promise<WorkAnswer[] | null> {
        let newWorkAnswers: WorkAnswer[] = [];

        for (let element of data) {
            let workAnswer = new WorkAnswer();
            workAnswer.workId = element.workId;
            workAnswer.answerId = element.answerId;
            workAnswer.duration = element.duration;
            workAnswer.isChecked = element.isChecked;
            newWorkAnswers.push(workAnswer);
        }

        try {
            let workAnswers = await this.repository.save(newWorkAnswers);
            return new Promise(resolve => { resolve(workAnswers); });
        } catch (error) {
            return new Promise(resolve => { resolve(null); });
        }

    }

    //TODO: Optimize getting of workAnswers
    async updateMultiple(data: { workId: number, answerId: number, isChecked: boolean, duration: number; }[]): Promise<WorkAnswer[] | null> {
        let workAnswers: WorkAnswer[] = [];

        for (let element of data) {
            let workAnswer = await this.getWorkAnswerByWorkAndAnswerID(element.workId, element.answerId);
            if (workAnswer == null) {
                continue;
            }

            workAnswer.isChecked = element.isChecked;
            workAnswer.duration = element.duration;
            workAnswers.push(workAnswer);
        }

        try {
            let updatedWorkAnswers = await this.repository.save(workAnswers);
            return new Promise(resolve => { resolve(updatedWorkAnswers); });
        } catch (error) {
            return new Promise(resolve => { resolve(null); });
        }

    }

}