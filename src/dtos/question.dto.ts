import * as Validator from "class-validator";
import { AddAnswerDTO } from "./answer.dto";


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