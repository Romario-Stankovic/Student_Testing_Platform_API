import * as Validator from "class-validator";

export class AddAnswerDTO {
    
    questionId: number;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    answerText: string;

    @Validator.IsOptional()
    @Validator.IsNotEmpty()
    @Validator.IsString()
    imagePath: string;

    @Validator.IsBoolean()
    @Validator.IsNotEmpty()
    isCorrect : boolean;

}