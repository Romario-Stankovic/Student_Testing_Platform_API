import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddAdministratorDTO } from "src/dtos/administrator.dto";
import { Administrator } from "src/entities/administrator.entity";
import * as crypto from "crypto";
import { Repository } from "typeorm/repository/Repository";

@Injectable()
export class AdministratorService {
    constructor(
        @InjectRepository(Administrator)
        private readonly repository: Repository<Administrator>
    ) { }

    async getByID(id: number): Promise<Administrator | null> {
        let administrator = await this.repository.findOne(id);

        if (administrator == undefined) {
            return new Promise(resolve => { resolve(null); });
        }

        return new Promise(resolve => { resolve(administrator); });

    }

    async getByUsername(username: string): Promise<Administrator | null> {
        let administrator = await this.repository.findOne({ where: { username: username } });

        if (administrator == undefined) {
            return new Promise(resolve => { resolve(null); });
        }

        return new Promise(resolve => { resolve(administrator); });
    }

    async add(data: AddAdministratorDTO): Promise<Administrator | null> {

        let passwordHash = crypto.createHash("sha512");
        passwordHash.update(data.password);
        let passwordHashString = passwordHash.digest("hex").toUpperCase();

        let newAdmin: Administrator = new Administrator();
        newAdmin.firstName = data.firstName;
        newAdmin.lastName = data.lastName;
        newAdmin.username = data.username;
        newAdmin.passwordHash = passwordHashString;

        try {
            let admin = await this.repository.save(newAdmin);
            return new Promise(resolve => { resolve(admin); });
        } catch (error) {
            return new Promise(resolve => { resolve(null); });
        }

    }

}