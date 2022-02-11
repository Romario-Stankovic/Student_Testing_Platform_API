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

export class DeleteTestDTO {
    @Validator.IsNumber()
    @Validator.IsNotEmpty()
    testId : number;
}

class ModifyTestQuestion {
    @Validator.IsNumber()
    questionId : number | null;

    @Validator.IsString()
    @Validator.IsNotEmpty()
    questionText : string;

    @Validator.IsString()
    imagePath : string | null;

    @Validator.IsBoolean()
    @Validator.IsNotEmpty()
    toDelete : boolean;

    @Validator.ValidateNested()
    answers : ModifyTestAnswer[];

}

class ModifyTestAnswer {
    @Validator.IsNumber()
    answerId: number | null;
    @Validator.IsString()
    @Validator.IsNotEmpty()
    answerText: string;
    @Validator.IsString()
    imagePath: string | null;
    @Validator.IsBoolean()
    @Validator.IsNotEmpty()
    isCorrect: boolean;
    @Validator.IsBoolean()
    @Validator.IsNotEmpty()
    toDelete: boolean;
}

export class ModifyTestQuestionsDTO {
    @Validator.IsNotEmpty()
    @Validator.IsNumber()
    testId : number;

    @Validator.ValidateNested()
    questions : ModifyTestQuestion[];
}