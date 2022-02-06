import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FinishedWork } from "src/dtos/work.dto";
import { Work } from "src/entities/work.entity";
import { Repository } from "typeorm";

@Injectable()
export class WorkService {
    constructor(
        @InjectRepository(Work)
        private readonly repository : Repository<Work>
    ){}

    async add(studentId: number, testId: number) : Promise<Work | null>{
        let newWork = new Work();
        newWork.testId = testId;
        newWork.studentId = studentId;
        newWork.startedAt = new Date();

        try {
            let work = await this.repository.save(newWork);
            return new Promise(resolve => {resolve(work)});
        }catch (error) {
            return new Promise(resolve => {resolve(null)});
        }

    }

    async getByID(id: number): Promise<Work | null> {

        let work = await this.repository.findOne(id);

        if (work == undefined) {
            return new Promise(resolve => { resolve(null); });
        }

        return new Promise(resolve => { resolve(work); });

    }

    async getFinishedByStudentID(id : number) : Promise<FinishedWork[] | null>{
        let dbworks = await this.repository.find({where: {studentId : id}, relations: ["test"]});
        let works : FinishedWork[] = [];

        for(let work of dbworks){
            works.push(new FinishedWork(work.workId, work.test.testName, work.startedAt, work.endedAt, work.points));
        }

        return new Promise(resolve => {resolve(works)});
    }

    async endWork(id : number, points : number) : Promise<Work | null> {
        let work = await this.getByID(id);

        if(work == null){
            return new Promise(resolve => {resolve(null)});
        }

        work.endedAt = new Date();
        work.points = points;

        let dbwork = this.repository.save(work);

        if(dbwork == null){
            return new Promise(resolve => {resolve(null)});
        }

        return new Promise(resolve => {resolve(dbwork)});

    }

}