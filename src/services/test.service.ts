import { Injectable, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Test } from "src/entities/test.entity";
import { LessThanOrEqual, MoreThan, MoreThanOrEqual } from "typeorm";
import { Repository } from "typeorm/repository/Repository";

@Injectable()
export class TestService {
    constructor(
        @InjectRepository(Test)
        private readonly repository: Repository<Test>
    ) { }

    async getByID(id: number): Promise<Test | null> {

        let test = await this.repository.findOne(id);

        if (test == undefined) {
            return new Promise(resolve => { resolve(null); });
        }

        return new Promise(resolve => { resolve(test); });

    }

    
    async getByProfessorId(id : number) : Promise<Test[] | null> {
        let tests = await this.repository.find({where: {professorId: id}});
        
        if(tests.length == 0){
            return new Promise(resolve => {resolve(null)});
        }
        
        return new Promise(resolve => resolve(tests));
        
    }

    async getActive(): Promise<Test[] | null> {
        let current = new Date();
        let tests = await this.repository.find({where: {startAt: LessThanOrEqual(current), endAt: MoreThan(current)}});

        if(tests.length == 0){
            return new Promise(resolve => {resolve(null)});
        }

        return new Promise(resolve => {resolve(tests)});

    }
    async add(professorId : number, testName : string, duration : number, questionCount : number, startAt: Date, endAt : Date) : Promise<Test | null>{

        if(duration < 0){
            return new Promise(resolve => {resolve(null)});
        }

        if(questionCount < 0){
            return new Promise(resolve => {resolve(null)});
        }

        let newTest = new Test();
        newTest.professorId = professorId;
        newTest.testName = testName;
        newTest.duration = duration;
        newTest.questionCount = questionCount;
        newTest.startAt = startAt;
        newTest.endAt = endAt;

        try {
            let test = await this.repository.save(newTest);
            return new Promise(resolve => {resolve(test)});
        }catch (error){
            return new Promise(resolve => {resolve(null)});
        }

    }

    async update(id : number, professorId : number, testName : string, duration : number, questionCount : number, startAt: Date, endAt : Date) : Promise<Test | null>{
        
        let test = await this.getByID(id);

        if(test == undefined){
            return new Promise(resolve => {resolve(null)});
        }

        if(duration < 0){
            return new Promise(resolve => {resolve(null)});
        }

        if(questionCount < 0){
            return new Promise(resolve => {resolve(null)});
        }

        test.professorId = professorId != null ? professorId : test.professorId;
        test.testName = testName != null ? testName : test.testName;
        test.duration = duration != null ? duration : test.duration;
        test.questionCount = questionCount != null ? questionCount : test.questionCount;
        test.startAt = startAt != null ? startAt : test.startAt;
        test.endAt = endAt != null ? endAt : test.endAt;

        try {
            let updateTest = this.repository.save(test);
            return new Promise(resolve => {resolve(updateTest)});
        }catch(error){
            return new Promise(resolve => {resolve(null)});
        }

    }

    async delete(id : number) : Promise<Test | null>{
        let test = await this.getByID(id);
        if(test == undefined){
            return new Promise(resolve => {resolve(null)});
        }

        try {
            let deletedTest = await this.repository.remove(test);
            return new Promise(resolve => {resolve(deletedTest)});
        }catch(error){
            return new Promise(resolve => {resolve(null)});
        }

    }

}