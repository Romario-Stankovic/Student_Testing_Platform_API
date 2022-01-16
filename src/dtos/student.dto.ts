import * as Validator from "class-validator";

export class AddStudentDTO {
    
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
    @Validator.Matches(/^[0-9]{10}$/)
    indexNumber : string;
}

export class EditStudentDTO {

    @Validator.IsOptional()
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(1, 50)
    firstName : string | null;

    @Validator.IsOptional()
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(1, 50)
    lastName : string | null;
    
    @Validator.IsOptional()
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Matches(/^[0-9]{10}$/)
    indexNumber : string | null;
}

export class LoginStudentDTO {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Matches(/^[0-9]{10}$/)
    indexNumber : string;
}
