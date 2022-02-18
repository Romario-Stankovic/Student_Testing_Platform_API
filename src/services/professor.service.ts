import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Professor } from "src/entities/professor.entity";
import * as crypto from "crypto";
import { Repository } from "typeorm/repository/Repository";

@Injectable()
export class ProfessorService {
    constructor(
        @InjectRepository(Professor)
        private readonly repository: Repository<Professor>
    ) { }

    async getByID(id: number): Promise<Professor | null> {
        let professor = await this.repository.findOne(id);

        if (professor == undefined) {
            return new Promise(resolve => { resolve(null); });
        }

        return new Promise(resolve => { resolve(professor); });

    }

    async getByUsername(username: string): Promise<Professor | null> {
        let professor = await this.repository.findOne({ where: { username: username } });
        if (professor == undefined) {
            return new Promise(resolve => { resolve(null); });
        }

        return new Promise(resolve => { resolve(professor); });
    }

    async getAll() : Promise<Professor[] | null> {
        let professors = await this.repository.find();
        
        if(professors.length == 0){
            return new Promise(resolve => { resolve(null); });
        }
        
        return new Promise(resolve => { resolve(professors); });
    }

    async add(firstName : string, lastName : string, username : string, password : string, imagePath : string ): Promise<Professor | null> {

        let hash = crypto.createHash("sha512");
        hash.update(password);
        let hashedPassword = hash.digest("hex").toUpperCase();

        let newProfessor: Professor = new Professor();
        newProfessor.firstName = firstName;
        newProfessor.lastName = lastName;
        newProfessor.username = username;
        newProfessor.passwordHash = hashedPassword;
        newProfessor.imagePath = imagePath;

        try {
            let professor = await this.repository.save(newProfessor);
            return new Promise(resolve => { resolve(professor); });
        } catch (error) {
            return new Promise(resolve => { resolve(null); });
        }
    }

    async update(id : number, firstName : string, lastName : string, username : string, password : string) : Promise<Professor | null> {
        let professor = await this.getByID(id);

        if(professor == null){
            return new Promise(resolve => {resolve(null)});
        }

        professor.firstName = firstName != null ? firstName : professor.firstName;
        professor.lastName = lastName != null ? lastName : professor.lastName;
        professor.username != null ? username : professor.username;

        if(password != null) {
            let hash = crypto.createHash("sha512");
            hash.update(password);
            let hashedPassword = hash.digest("hex").toUpperCase();
            professor.passwordHash = hashedPassword;
        }

        try {
            let updatedProfessor = await this.repository.save(professor);
            return new Promise(resolve => {resolve(updatedProfessor)});
        }catch(error){
            return new Promise(resolve => {resolve(null)});
        }

    }

    async delete(professorId : number) : Promise<Professor | null>{
        let professor = await this.getByID(professorId);

        if(professor == null){
            return new Promise(resolve => {resolve(null)});
        }

        try {
            let deletedProfessor = await this.repository.remove(professor);
            return new Promise(resolve => {resolve(deletedProfessor)});
        }catch(error){
            return new Promise(resolve => {resolve(null)});
        }

    }

}