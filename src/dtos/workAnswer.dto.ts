import * as Validator from "class-validator";

export class WorkQuestion {
    questionId : number;
    questionText : string;
    imagePath : string;
    multichoice : boolean;
    duration : number;
    answers : WorkQuestionAnswer[];

    constructor (questionId : number, questionText : string, imagePath : string, multichoice : boolean, duration: number, answers : WorkQuestionAnswer[]){
        this.questionId = questionId;
        this.questionText = questionText;
        this.imagePath = imagePath;
        this.multichoice = multichoice;
        this.duration = duration;
        this.answers = answers;
    }

}

export class WorkQuestionAnswer {
    answerId : number;
    answerText : string;
    imagePath : string;
    isChecked : boolean;
    isCorrect : boolean;

    constructor(answerId : number, answerText : string, imagePath : string, isChecked : boolean, isCorrect : boolean){
        this.answerId = answerId;
        this.answerText = answerText;
        this.imagePath = imagePath;
        this.isChecked = isChecked;
        this.isCorrect = isCorrect;
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