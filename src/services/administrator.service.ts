import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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

    async add(firstName: string, lastName: string, username: string, password: string): Promise<Administrator | null> {

        let hash = crypto.createHash("sha512");
        hash.update(password);
        let hashedPassword = hash.digest("hex").toUpperCase();

        let newAdmin: Administrator = new Administrator();
        newAdmin.firstName = firstName;
        newAdmin.lastName = lastName;
        newAdmin.username = username;
        newAdmin.passwordHash = hashedPassword;

        try {
            let admin = await this.repository.save(newAdmin);
            return new Promise(resolve => { resolve(admin); });
        } catch (error) {
            return new Promise(resolve => { resolve(null); });
        }

    }

}