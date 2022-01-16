import { JSONWebToken } from "src/dtos/auth.dto";

declare module "express" {
    interface Request {
        token : JSONWebToken;
    }
}