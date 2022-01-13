import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { APIResponse } from "src/api.response";
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

    getByID(id: number): Promise<Administrator | APIResponse> {

        return new Promise(async (resolve) => {
            let administrator = await this.administrator.findOne(id);
            if(administrator == null){
                resolve(new APIResponse("Error", -1001));
            }
            resolve(administrator);
        });

    }

    add(data: AddAdministratorDTO) : Promise<Administrator | APIResponse> {
        let passwordHash = crypto.createHash("sha512");
        passwordHash.update(data.password);

        let passwordHashString = passwordHash.digest("hex").toUpperCase();

        let newAdmin : Administrator = new Administrator();
        newAdmin.firstName = data.firstName;
        newAdmin.lastName = data.lastName;
        newAdmin.username = data.username;
        newAdmin.passwordHash = passwordHashString;

        return new Promise((resolve) => {
            this.administrator.save(newAdmin)
            .then(data => resolve(data))
            .catch(error => {
                resolve(new APIResponse("Error", -1002));
            });
        });

    }

}