import * as Validator from "class-validator";

export class StartWorkDTO {
    @Validator.IsNumber()
    @Validator.IsNotEmpty()
    studentId: number;

    @Validator.IsNumber()
    @Validator.IsNotEmpty()
    testId: number;
}

export class EndWorkDTO {
    @Validator.IsNumber()
    @Validator.IsNotEmpty()
    workId: number;
}

export class StartedWork {
    workId: number;
    testName: string;
    startedAt: Date;
    endsAt: Date;
    questions: number[] = [];

    constructor(workId: number, testName: string, startedAt: Date, endsAt: Date, questions: number[]) {
        this.workId = workId;
        this.testName = testName;
        this.startedAt = startedAt;
        this.endsAt = endsAt;
        this.questions = questions;
    }

}

export class FinishedWork {
    workId: number;
    testName: string;
    startedAt: Date;
    endedAt: Date;
    points: number;

    constructor(workId: number, testName: string, startedAt: Date, endedAt: Date, points: number) {
        this.workId = workId;
        this.testName = testName;
        this.startedAt = startedAt;
        this.endedAt = endedAt;
        this.points = points;
    }

}

export class WorkStudent {
    workId: number;
    studentIndexNumber: string;
    testName: string;
    points: number;

    constructor(workId: number, studentIndexNumber: string, testName: string, points: number) {
        this.workId = workId;
        this.studentIndexNumber = studentIndexNumber;
        this.testName = testName;
        this.points = points;
    }
}