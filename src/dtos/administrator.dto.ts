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

export class JWTAdministratorDTO {
    administratorId : number;
    username : string;
    exp_date: number; // UNIX timestamp
    ip : string;
    user_agent : string;

    constructor(administratorId : number, username : string, exp_date : number, ip : string, user_agent : string){
        this.administratorId = administratorId;
        this.username = username;
        this.exp_date = exp_date;
        this.ip = ip;
        this.user_agent = user_agent;
    }

    toPlainObject() {
        return {
            administratorID: this.administratorId,
            username : this.username,
            exp_date: this.exp_date,
            ip: this.ip,
            user_agent : this.user_agent
        }
    }

}