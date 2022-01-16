export class AddAdministratorDTO {
    firstName : string;
    lastName : string;
    username : string;
    password : string;
}

export class LoginAdministratorDTO {
    username : string;
    password : string;
}

export class LoginResponseAdministratorDTO {
    administratorId : number;
    username : string;
    firstName : string;
    lastName : string;
    token : string;

    constructor(administratorId : number, username : string, firstName : string, lastName : string, token : string){
        this.administratorId = administratorId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.token = token;
    }

}