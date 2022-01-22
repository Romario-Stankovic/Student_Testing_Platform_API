import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Token } from "src/entities/token.entity";
import { Repository } from "typeorm";

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(Token)
        private readonly token: Repository<Token>
    ) { }

    add(userId: number, userRole: "administrator" | "professor" | "student", token: string, expiresAt: Date): Promise<Token | null> {
        let newToken = new Token();
        newToken.userId = userId;
        newToken.userRole = userRole;
        newToken.token = token;
        newToken.expiresAt = expiresAt;

        try {
            let token = this.token.save(newToken);
            return new Promise(resolve => { resolve(token); });
        } catch (error) {
            return new Promise(resolve => { resolve(null); });
        }
    }

    async getToken(tokenString: string): Promise<Token | null> {
        let token = await this.token.findOne({ where: { token: tokenString } });

        if (token == undefined) {
            return new Promise(resolve => { resolve(null); });
        }

        return new Promise(resolve => { resolve(token); });

    }

    async invalidateToken(tokenString: string): Promise<boolean> {
        let token = await this.token.findOne({ where: { token: tokenString } });

        if (token == undefined) {
            return new Promise(resolve => { resolve(false); });
        }
        token.isValid = false;

        try {
            await this.token.save(token);
            return new Promise(resolve => { resolve(true); });
        } catch {
            return new Promise(resolve => { resolve(false); });
        }

    }

    async invalidateAllTokensFor(id: number, role: "administrator" | "professor" | "student"): Promise<boolean> {
        let tokens = await this.token.find({ where: { userId: id, userRole: role } });

        if (tokens.length == 0) {
            return new Promise(resolve => { resolve(false); });
        }

        for (let token of tokens) {
            this.invalidateToken(token.token);
        }

        return new Promise(resolve => { resolve(true); });

    }

}