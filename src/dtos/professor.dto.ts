import * as Validator from "class-validator";

export class PostProfessorDTO {

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
    @Validator.Length(1, 50)
    username: string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(8)
    password: string;
}

export class PatchProfessorDTO {
    @Validator.IsNumber()
    @Validator.IsNotEmpty()
    professorId: number;

    @Validator.IsOptional()
    @Validator.IsString()
    @Validator.IsNotEmpty()
    @Validator.Length(1, 50)
    firstName: string | null;

    @Validator.IsOptional()
    @Validator.IsString()
    @Validator.IsNotEmpty()
    @Validator.Length(1, 50)
    lastName: string | null;

    @Validator.IsOptional()
    @Validator.IsString()
    @Validator.IsNotEmpty()
    @Validator.Length(1, 50)
    username: string | null;

    @Validator.IsOptional()
    @Validator.IsString()
    @Validator.IsNotEmpty()
    @Validator.Length(8)
    password: string | null;
}

export class DeleteProfessorDTO {
    @Validator.IsNotEmpty()
    @Validator.IsNumber()
    professorId: number;
}

export class LoginProfessorDTO {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    username: string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    password: string;
}

export class ProfessorIdentity {
    id: number;
    role: string;
    firstName: string;
    lastName: string;
    username: string;
    imagePath: string | null;

    constructor(id: number, role: string, firstName: string, lastName: string, username: string, imagePath: string | null) {
        this.id = id;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.imagePath = imagePath;
    }

}