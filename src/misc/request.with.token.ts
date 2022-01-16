import { JwtDTO } from "src/dtos/auth.dto";

declare module "express" {
    interface Request {
        token : JwtDTO;
    }
}