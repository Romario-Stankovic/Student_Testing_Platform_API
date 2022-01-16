import * as Validator from "class-validator";

export class AddProfessorDTO {

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(1, 50)
    firstName : string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(1, 50)
    lastName : string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(1, 50)
    username : string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(8)
    password : string;
}

export class LoginProfessorDTO {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    username : string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    password : string;
}