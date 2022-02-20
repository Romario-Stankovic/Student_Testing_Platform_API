import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Token } from "src/entities/token.entity";
import { Repository } from "typeorm";

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(Token)
        private readonly repository: Repository<Token>
    ) { }

    async getByToken(tokenString: string): Promise<Token | null> {
        let token = await this.repository.findOne({ where: { token: tokenString } });

        if (token == undefined) {
            return new Promise(resolve => { resolve(null); });
        }

        return new Promise(resolve => { resolve(token); });

    }

    async add(userId: number, userRole: "administrator" | "professor" | "student", token: string, expiresAt: Date): Promise<Token | null> {
        let newToken = new Token();
        newToken.userId = userId;
        newToken.userRole = userRole;
        newToken.token = token;
        newToken.expiresAt = expiresAt;

        try {
            let token = await this.repository.save(newToken);
            return new Promise(resolve => { resolve(token); });
        } catch (error) {
            return new Promise(resolve => { resolve(null); });
        }
    }


    async invalidateToken(tokenString: string): Promise<Token | null> {
        let token = await this.repository.findOne({ where: { token: tokenString } });

        if (token == undefined) {
            return new Promise(resolve => { resolve(null); });
        }
        token.isValid = false;

        try {
            let invalidatedToken = await this.repository.save(token);
            return new Promise(resolve => { resolve(invalidatedToken); });
        } catch {
            return new Promise(resolve => { resolve(null); });
        }

    }

    async invalidateByUserID(id: number, role: "administrator" | "professor" | "student"): Promise<Token[] | null> {
        let tokens = await this.repository.find({ where: { userId: id, userRole: role } });

        if (tokens.length == 0) {
            return new Promise(resolve => { resolve(null); });
        }

        for (let token of tokens) {
            token.isValid = false;
        }

        try {
            let invalidatedTokens = await this.repository.save(tokens);
            return new Promise(resolve => { resolve(invalidatedTokens); });
        } catch (error) {
            return new Promise(resolve => { resolve(null); });
        }

    }

}