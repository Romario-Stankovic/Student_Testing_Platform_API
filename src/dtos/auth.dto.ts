export class JwtDTO {
    id : number;
    identity : string;
    role : "administrator" | "professor" | "student";
    exp_date: number; // UNIX timestamp
    ip : string;
    user_agent : string;

    constructor(id : number, identity : string, role : ("administrator" | "professor" | "student"), exp_date : number, ip : string, user_agent : string){
        this.id = id;
        this.identity = identity;
        this.role = role;
        this.exp_date = exp_date;
        this.ip = ip;
        this.user_agent = user_agent;
    }

    toPlainObject() {
        return {
            id: this.id,
            identity : this.identity,
            role: this.role,
            exp_date: this.exp_date,
            ip: this.ip,
            user_agent : this.user_agent
        }
    }

}