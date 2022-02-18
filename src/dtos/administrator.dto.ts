import * as Validator from "class-validator";

export class AddAdministratorDTO {
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

export class LoginAdministratorDTO {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    username: string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    password: string;
}

export class IdentityAdministratorDTO {
    id:number;
    role:string;
    firstName : string;
    lastName : string;
    username : string;

    constructor(id:number, role:string,firstName : string, lastName : string, username : string){
        this.id = id;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
    }
}

export class DeleteAdminDTO {
    @Validator.IsNotEmpty()
    @Validator.IsNumber()
    administratorId : number;
}

export class UpdateAdminDTO {
    @Validator.IsNumber()
    @Validator.IsNotEmpty()
    administratorId : number;

    @Validator.IsOptional()
    @Validator.IsString()
    @Validator.IsNotEmpty()
    @Validator.Length(1, 50)
    firstName : string | null;

    @Validator.IsOptional()
    @Validator.IsString()
    @Validator.IsNotEmpty()
    @Validator.Length(1, 50)
    lastName : string | null;

    @Validator.IsOptional()
    @Validator.IsString()
    @Validator.IsNotEmpty()
    @Validator.Length(1, 50)
    username : string | null;

    @Validator.IsOptional()
    @Validator.IsString()
    @Validator.IsNotEmpty()
    @Validator.Length(8)
    password : string | null;
}