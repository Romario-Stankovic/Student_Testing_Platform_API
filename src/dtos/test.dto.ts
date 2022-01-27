import * as Validator from "class-validator";

export class AddTestDTO {

    @Validator.IsNumberString()
    professorId: number;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(1, 100)
    testName: string;

    @Validator.IsNotEmpty()
    @Validator.IsNumberString()
    duration : number;

    @Validator.IsNumberString()
    @Validator.IsNotEmpty()
    questionCount : number;

    @Validator.IsDateString()
    @Validator.IsNotEmpty()
    startAt: Date;

    @Validator.IsDateString()
    @Validator.IsNotEmpty()
    endAt: Date;
}