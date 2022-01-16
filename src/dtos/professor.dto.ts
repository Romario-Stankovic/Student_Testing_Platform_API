export class AddProfessorDTO {
    firstName : string;
    lastName : string;
    username : string;
    password : string;
    imagePath : string;
}

export class LoginProfessorDTO {
    username : string;
    password : string;
}

export class LoginResponseProfessorDTO {
    professorId : number;
    username : string;
    firstName : string;
    lastName : string;
    imagePath : string | null;
    token : string;

    constructor(professorId : number, username : string, firstName : string, lastName : string, imagePath : string | null, token : string){
        this.professorId = professorId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.imagePath = imagePath;
        this.token = token;
    }

}