export class AddStudentDTO {
    firstName : string;
    lastName : string;
    indexNumber : string;
}

export class EditStudentDTO {
    firstName : string;
    lastName : string;
    indexNumber: string;
}

export class LoginStudentDTO {
    indexNumber : string;
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