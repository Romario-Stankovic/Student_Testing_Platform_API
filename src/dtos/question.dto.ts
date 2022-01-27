import * as Validator from "class-validator";

export class AddQuestionDTO {

    testId : number;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    questionText : string;

    @Validator.IsOptional()
    @Validator.IsNotEmpty()
    @Validator.IsString()
    imagePath: string;

}