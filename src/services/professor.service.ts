import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddProfessorDTO } from "src/dtos/professor.dto";
import { Professor } from "src/entities/professor.entity";
import * as crypto from "crypto";
import { Repository } from "typeorm/repository/Repository";

@Injectable()
export class ProfessorService {
    constructor(
        @InjectRepository(Professor)
        private readonly professor: Repository<Professor>
    ) {}

    async getByID(id: number): Promise<Professor | null> {
        let professor = await this.professor.findOne(id);

        if(professor == undefined){
            return new Promise(resolve => {resolve(null)});
        }

        return new Promise(resolve => {resolve(professor)});

    }

    async getByUsername(username: string) : Promise<Professor | null>{
        let professor = await this.professor.findOne({where: {username: username}});
        if(professor == undefined){
            return new Promise(resolve => {resolve(null)});
        }

        return new Promise(resolve => {resolve(professor)});
    }

    add(data : AddProfessorDTO): Promise<boolean>{

        let passwordHash = crypto.createHash("sha512");
        passwordHash.update(data.password);
        let passwordHashString = passwordHash.digest("hex").toUpperCase();

        let newProfessor : Professor = new Professor();
        newProfessor.firstName = data.firstName;
        newProfessor.lastName = data.lastName;
        newProfessor.username = data.username;
        newProfessor.passwordHash = passwordHashString;

        try {
            this.professor.save(newProfessor);
            return new Promise(resolve => {resolve(true)});
        }catch(error){
            return new Promise(resolve => {resolve(false)});
        }
    }

}