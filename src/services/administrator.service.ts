import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddAdministratorDTO } from "src/dtos/administrator.dto";
import { Administrator } from "src/entities/administrator.entity";
import { Repository } from "typeorm";
import * as crypto from "crypto";

@Injectable()
export class AdministratorService {
    constructor(
        @InjectRepository(Administrator)
        private readonly administrator: Repository<Administrator>
    ){}

    async getByID(id: number): Promise<Administrator | null> {
        let administrator = await this.administrator.findOne(id);

        if(administrator == undefined){
            return new Promise(resolve => {resolve(null)});
        }

        return new Promise(resolve => {resolve(administrator)});

    }

    async getByUsername(username: string) : Promise<Administrator | null>{
        let administrator = await this.administrator.findOne({where : {username: username}});

        if(administrator == undefined){
            return new Promise(resolve => {resolve(null)});
        }

        return new Promise(resolve => {resolve(administrator)});
    }

    add(data: AddAdministratorDTO) : Promise<boolean> {

        let passwordHash = crypto.createHash("sha512");
        passwordHash.update(data.password);
        let passwordHashString = passwordHash.digest("hex").toUpperCase();

        let newAdmin : Administrator = new Administrator();
        newAdmin.firstName = data.firstName;
        newAdmin.lastName = data.lastName;
        newAdmin.username = data.username;
        newAdmin.passwordHash = passwordHashString;

        try {
            this.administrator.save(newAdmin);
            return new Promise(resolve => {resolve(true)});
        }catch(error){
            return new Promise(resolve => {resolve(false)});
        }

    }

}