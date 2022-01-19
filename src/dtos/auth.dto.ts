import * as Validator from "class-validator";

export class JSONWebToken {
    id: number;
    identity: string;
    role: "administrator" | "professor" | "student";
    expDate: number; // UNIX timestamp in milis
    ip: string;
    userAgent: string;
    type: "access" | "refresh";

    constructor(id: number, identity: string, role: ("administrator" | "professor" | "student"), expDate: number, ip: string, userAgent: string, type: ("access" | "refresh")) {
        this.id = id;
        this.identity = identity;
        this.role = role;
        this.expDate = expDate;
        this.ip = ip;
        this.userAgent = userAgent;
        this.type = type;
    }

    toPlainObject() {
        return {
            id: this.id,
            identity: this.identity,
            role: this.role,
            expDate: this.expDate,
            ip: this.ip,
            userAgent: this.userAgent,
            type: this.type
        };
    }

}

export class RefreshTokenDTO {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    refreshToken: string;
}

export class LoginResponse {
    id: number;
    identity: string;
    token: string;
    refreshToken: string;
    refreshTokenExpiresAt: string;

    constructor(id: number, identity: string, token: string, refreshToken: string, refreshTokenExpiresAt: string) {
        this.id = id;
        this.identity = identity;
        this.token = token;
        this.refreshToken = refreshToken;
        this.refreshTokenExpiresAt = refreshTokenExpiresAt;
    }

}