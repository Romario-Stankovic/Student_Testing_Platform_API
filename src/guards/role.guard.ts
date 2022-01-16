import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import {Request} from "express";
import { Reflector } from "@nestjs/core";
@Injectable()
export class RoleGuard implements CanActivate{

    constructor (private reflector : Reflector) {

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        let request : Request = context.switchToHttp().getRequest();
        const allowedToRoles = this.reflector.get<("administrator" | "professor" | "student")[]>("allowedRoles", context.getHandler());

        if(!allowedToRoles.includes(request.token.role)){
            return false;
        }

        return true;

    }
    
}