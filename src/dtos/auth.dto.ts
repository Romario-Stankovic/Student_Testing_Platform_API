export class JSONWebToken {
    id : number;
    identity : string;
    role : "administrator" | "professor" | "student";
    exp_date: number; // UNIX timestamp in seconds
    ip : string;
    user_agent : string;

    constructor(id : number, identity : string, role : ("administrator" | "professor" | "student"), exp_date : number, ip : string, user_agent : string){
        this.id = id;
        this.identity = identity;
        this.role = role;
        this.exp_date = exp_date;
        this.ip = ip;
        this.user_agent = user_agent;
    }

    toPlainObject() {
        return {
            id: this.id,
            identity : this.identity,
            role: this.role,
            exp_date: this.exp_date,
            ip: this.ip,
            user_agent : this.user_agent
        }
    }

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

export class LoginResponseStudentDTO {
    studentId : number;
    firstName : string;
    lastName : string;
    indexNumber : string;
    imagePath : string | null;
    token : string;

    constructor(studentId : number, firstName : string, lastName : string, indexNumber : string, imagePath : string | null, token : string){
        this.studentId = studentId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.indexNumber = indexNumber;
        this.imagePath = imagePath;
        this.token = token;
    }
}