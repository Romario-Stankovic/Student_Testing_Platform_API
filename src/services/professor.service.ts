import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { of } from "rxjs";
import { APIResponse } from "src/api.response";
import { AddProfessorDTO } from "src/dtos/professor/add.professor.dto";
import { Professor } from "src/entities/professor.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProfessorService {
    constructor(
        @InjectRepository(Professor)
        private readonly professor: Repository<Professor>
    ) {}

    getByID(id: number): Promise<Professor | APIResponse> {

        return new Promise(async (resolve) => {
            let professor = await this.professor.findOne(id);
            if(professor == null){
                resolve(new APIResponse("Error", -1001));
            }
            resolve(professor);
        });

    }

    add(data : AddProfessorDTO): Promise<Professor | APIResponse>{
        const crypto = require("crypto");

        let passwordHash = crypto.createHash("sha512");
        passwordHash.update(data.password);

        let passwordHashString = passwordHash.digest("hex").toUpperCase();

        let newProfessor : Professor = new Professor();
        newProfessor.firstName = data.firstName;
        newProfessor.lastName = data.lastName;
        newProfessor.imagePath = data.imagePath;
        newProfessor.username = data.username;
        newProfessor.password = passwordHashString;

        return new Promise((resolve) => {
            this.professor.save(newProfessor)
            .then(data => resolve(data))
            .catch(error => {
                let resp : APIResponse = new APIResponse("Error", -1002);
                resolve(resp);
            });
        });
    }

}