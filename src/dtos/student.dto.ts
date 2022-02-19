import * as Validator from "class-validator";

export class AddStudentDTO {

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(1, 50)
    firstName: string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(1, 50)
    lastName: string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Matches(/^[0-9]{10}$/)
    indexNumber: string;
}

export class UpdateStudentDTO {

    @Validator.IsNumber()
    @Validator.IsNotEmpty()
    studentId : number;

    @Validator.IsOptional()
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(1, 50)
    firstName: string | null;

    @Validator.IsOptional()
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(1, 50)
    lastName: string | null;

    @Validator.IsOptional()
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Matches(/^[0-9]{10}$/)
    indexNumber: string | null;
}

export class LoginStudentDTO {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Matches(/^[0-9]{10}$/)
    indexNumber: string;
}

export class StudentIdentity {
    id: number;
    role: string;
    firstName : string;
    lastName : string;
    indexNumber : string;
    imagePath : string | null;

    constructor(id:number, role: string, firstName : string, lastName : string, indexNumber : string, imagePath : string | null){
        this.id = id;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.indexNumber = indexNumber;
        this.imagePath = imagePath;
    }
}

export class DeleteStudentDTO {
    @Validator.IsNotEmpty()
    @Validator.IsNumber()
    studentId : number;
}