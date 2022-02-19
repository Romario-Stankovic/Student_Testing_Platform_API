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
    testId : number;

    @Validator.IsOptional()
    @Validator.IsNumber()
    @Validator.IsNotEmpty()
    professorId: number | null;

    @Validator.IsOptional()
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(1, 100)
    testName: string | null;

    @Validator.IsOptional()
    @Validator.IsNotEmpty()
    @Validator.IsNumber()
    duration : number | null;

    @Validator.IsOptional()
    @Validator.IsNumber()
    @Validator.IsNotEmpty()
    questionCount : number | null;

    @Validator.IsOptional()
    @Validator.IsDateString()
    @Validator.IsNotEmpty()
    startAt: Date | null;

    @Validator.IsOptional()
    @Validator.IsDateString()
    @Validator.IsNotEmpty()
    endAt: Date | null;
}

export class DeleteTestDTO {
    @Validator.IsNumber()
    @Validator.IsNotEmpty()
    testId : number;
}

class ModifyTestQuestion {
    
    @Validator.IsOptional()
    @Validator.IsNumber()
    @Validator.IsNotEmpty()
    questionId : number | null;

    @Validator.IsOptional()
    @Validator.IsString()
    @Validator.IsNotEmpty()
    questionText : string | null;

    @Validator.IsOptional()
    @Validator.IsString()
    imagePath : string | null;

    @Validator.IsOptional()
    @Validator.IsBoolean()
    @Validator.IsNotEmpty()
    toDelete : boolean | null;

    @Validator.ValidateNested()
    answers : ModifyTestAnswer[];

}

class ModifyTestAnswer {

    @Validator.IsOptional()
    @Validator.IsNumber()
    @Validator.IsNotEmpty()
    answerId: number | null;

    @Validator.IsOptional()
    @Validator.IsString()
    @Validator.IsNotEmpty()
    answerText: string | null;

    @Validator.IsOptional()
    @Validator.IsString()
    @Validator.IsNotEmpty()
    imagePath: string | null;

    @Validator.IsOptional()
    @Validator.IsBoolean()
    @Validator.IsNotEmpty()
    isCorrect: boolean | null;

    @Validator.IsOptional()
    @Validator.IsBoolean()
    @Validator.IsNotEmpty()
    toDelete: boolean | null;
}

export class ModifyTestQuestionsDTO {
    @Validator.IsNotEmpty()
    @Validator.IsNumber()
    testId : number;

    @Validator.ValidateNested()
    questions : ModifyTestQuestion[];
}