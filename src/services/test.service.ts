import { Injectable, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddTestDTO } from "src/dtos/test.dto";
import { Test } from "src/entities/test.entity";
import { LessThanOrEqual, MoreThan, MoreThanOrEqual } from "typeorm";
import { Repository } from "typeorm/repository/Repository";

@Injectable()
export class TestService {
    constructor(
        @InjectRepository(Test)
        private readonly repository: Repository<Test>
    ) { }

    async getById(id: number): Promise<Test | null> {

        let test = await this.repository.findOne(id);

        if (test == undefined) {
            return new Promise(resolve => { resolve(null); });
        }

        return new Promise(resolve => { resolve(test); });

    }

    async getAllActive(): Promise<Test[] | null> {
        let current = new Date();
        let tests = await this.repository.find({where: {startAt: LessThanOrEqual(current), endAt: MoreThan(current)}});

        if(tests.length == 0){
            return new Promise(resolve => {resolve(null)});
        }

        return new Promise(resolve => {resolve(tests)});

    }

    async getByProfessorId(id : number) : Promise<Test[] | null> {
        let tests = await this.repository.find({where: {professorId: id}});

        if(tests.length == 0){
            return new Promise(resolve => {resolve(null)});
        }

        return new Promise(resolve => resolve(tests));

    }

    async add(data: AddTestDTO) : Promise<Test | null>{

        if(data.duration < 0){
            return new Promise(resolve => {resolve(null)});
        }

        if(data.questionCount < 0){
            return new Promise(resolve => {resolve(null)});
        }

        let newTest = new Test();
        newTest.professorId = data.professorId;
        newTest.testName = data.testName;
        newTest.duration = data.duration;
        newTest.questionCount = data.questionCount;
        newTest.startAt = data.startAt;
        newTest.endAt = data.endAt;


        try {
            let test = await this.repository.save(newTest);
            return new Promise(resolve => {resolve(test)});
        }catch (error){
            return new Promise(resolve => {resolve(null)});
        }

    }

}