import * as Validator from "class-validator";

export class AddTestDTO {

    @Validator.IsNumber()
    @Validator.IsNotEmpty()
    professorId: number;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(1, 100)
    testName: string;

    @Validator.IsNotEmpty()
    @Validator.IsNumber()
    duration : number;

    @Validator.IsNumber()
    @Validator.IsNotEmpty()
    questionCount : number;

    @Validator.IsDateString()
    @Validator.IsNotEmpty()
    startAt: Date;

    @Validator.IsDateString()
    @Validator.IsNotEmpty()
    endAt: Date;
}

export class UpdateTestDTO {
    @Validator.IsNumber()
    @Validator.IsNotEmpty()
    professorId: number;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(1, 100)
    testName: string;

    @Validator.IsNotEmpty()
    @Validator.IsNumber()
    duration : number;

    @Validator.IsNumber()
    @Validator.IsNotEmpty()
    questionCount : number;

    @Validator.IsDateString()
    @Validator.IsNotEmpty()
    startAt: Date;

    @Validator.IsDateString()
    @Validator.IsNotEmpty()
    endAt: Date;
}