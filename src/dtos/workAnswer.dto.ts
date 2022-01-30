import * as Validator from "class-validator";

export class WorkQuestion {
    questionText : string;
    imagePath : string;
    multichoice : boolean;
    duration : number;
    answers : {
        answerId : number
        answerText : string;
        imagePath : string;
        isChecked : boolean;
    }[]

    constructor (questionText : string, imagePath : string, multichoice : boolean, duration: number, answers : {answerId: number, answerText : string, imagePath : string, isChecked : boolean}[]){
        this.questionText = questionText;
        this.imagePath = imagePath;
        this.multichoice = multichoice;
        this.duration = duration;
        this.answers = answers;
    }

}

export class PatchWorkAnswerDTO {
    @Validator.IsNumber()
    @Validator.IsNotEmpty()
    workId: number;
    
    @Validator.IsNumber()
    @Validator.IsNotEmpty()
    duration : number;

    @Validator.IsNotEmpty()
    answers: {
        id: number;
        isChecked : boolean;
    }[]
}