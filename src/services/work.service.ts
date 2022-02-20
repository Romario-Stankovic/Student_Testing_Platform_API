import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Work } from "src/entities/work.entity";
import { Repository } from "typeorm";

@Injectable()
export class WorkService {
    constructor(
        @InjectRepository(Work)
        private readonly repository: Repository<Work>
    ) { }


    async getByID(id: number): Promise<Work | null> {

        let work = await this.repository.findOne(id);

        if (work == undefined) {
            return new Promise(resolve => { resolve(null); });
        }

        return new Promise(resolve => { resolve(work); });

    }

    async getByTestID(testId: number): Promise<Work[] | null> {
        let works = await this.repository.find({ where: { testId: testId }, relations: ["student"] });

        if (works.length == 0) {
            return new Promise(resolve => { resolve(null); });
        }

        return new Promise(resolve => { resolve(works); });

    }

    async getFinishedByStudentID(id: number): Promise<Work[] | null> {
        let works = await this.repository.find({ where: { studentId: id }, relations: ["test"] });

        if (works.length == 0) {
            return null;
        }

        return new Promise(resolve => { resolve(works); });
    }

    async add(studentId: number, testId: number): Promise<Work | null> {
        let newWork = new Work();
        newWork.testId = testId;
        newWork.studentId = studentId;
        newWork.startedAt = new Date();

        try {
            let work = await this.repository.save(newWork);
            return new Promise(resolve => { resolve(work); });
        } catch (error) {
            return new Promise(resolve => { resolve(null); });
        }

    }

    async end(id: number, points: number): Promise<Work | null> {
        let work = await this.getByID(id);

        if (work == null) {
            return new Promise(resolve => { resolve(null); });
        }

        work.endedAt = new Date();
        work.points = points;

        try {
            let endedWork = this.repository.save(work);
            return new Promise(resolve => { resolve(endedWork); });
        } catch (error) {
            return new Promise(resolve => { resolve(null); });
        }
    }

}